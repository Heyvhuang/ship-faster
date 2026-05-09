#!/usr/bin/env python3
"""
Quick validation script for skills - minimal version
"""

import sys
import os
import re
import yaml
from pathlib import Path

def validate_skill(skill_path):
    """Basic validation of a skill"""
    skill_path = Path(skill_path)

    def _is_valid_metadata_value(value):
        if value is None:
            return True
        if isinstance(value, (str, int, float, bool)):
            return True
        if isinstance(value, list):
            return all(_is_valid_metadata_value(v) and not isinstance(v, (list, dict)) for v in value)
        if isinstance(value, dict):
            return all(isinstance(k, str) and _is_valid_metadata_value(v) for k, v in value.items())
        return False

    # Check SKILL.md exists
    skill_md = skill_path / 'SKILL.md'
    if not skill_md.exists():
        return False, "SKILL.md not found"

    # Enforce LF line endings (CRLF can break some skill loaders / parsers)
    raw = skill_md.read_bytes()
    if b"\r" in raw:
        return False, "SKILL.md must use LF line endings (found CRLF/CR)"

    # Read and validate frontmatter
    content = skill_md.read_text()
    if not content.startswith('---'):
        return False, "No YAML frontmatter found"

    # Extract frontmatter
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return False, "Invalid frontmatter format"

    frontmatter_text = match.group(1)

    # Parse YAML frontmatter
    try:
        frontmatter = yaml.safe_load(frontmatter_text)
        if not isinstance(frontmatter, dict):
            return False, "Frontmatter must be a YAML dictionary"
    except yaml.YAMLError as e:
        return False, f"Invalid YAML in frontmatter: {e}"

    # Define allowed properties
    ALLOWED_PROPERTIES = {
        'name',
        'description',
        'license',
        'compatibility',
        'argument-hint',
        'allowed-tools',
        'disable-model-invocation',
        'user-invocable',
        'model',
        'context',
        'agent',
        'hooks',
        'metadata',
    }

    # Check for unexpected properties (excluding nested keys under metadata)
    unexpected_keys = set(frontmatter.keys()) - ALLOWED_PROPERTIES
    if unexpected_keys:
        return False, (
            f"Unexpected key(s) in SKILL.md frontmatter: {', '.join(sorted(unexpected_keys))}. "
            f"Allowed properties are: {', '.join(sorted(ALLOWED_PROPERTIES))}"
        )

    # Check required fields
    if 'name' not in frontmatter:
        return False, "Missing 'name' in frontmatter"
    if 'description' not in frontmatter:
        return False, "Missing 'description' in frontmatter"

    # Extract name for validation
    name = frontmatter.get('name', '')
    if not isinstance(name, str):
        return False, f"Name must be a string, got {type(name).__name__}"

    name = name.strip()
    if not name:
        return False, "Name must be non-empty"

    directory_name = skill_path.resolve().name
    if name != directory_name:
        return False, f"Frontmatter name '{name}' must match directory name '{directory_name}'"

    if not re.match(r'^[a-z0-9-]+$', name):
        return False, f"Name '{name}' should be hyphen-case (lowercase letters, digits, and hyphens only)"
    if name.startswith('-') or name.endswith('-') or '--' in name:
        return False, f"Name '{name}' cannot start/end with hyphen or contain consecutive hyphens"
    if len(name) > 64:
        return False, f"Name is too long ({len(name)} characters). Maximum is 64 characters."

    # Extract and validate description
    description = frontmatter.get('description', '')
    if not isinstance(description, str):
        return False, f"Description must be a string, got {type(description).__name__}"

    description = description.strip()
    if not description:
        return False, "Description must be non-empty"

    if len(description) > 1024:
        return False, f"Description is too long ({len(description)} characters). Maximum is 1024 characters."

    compatibility = frontmatter.get('compatibility')
    if compatibility is not None:
        if not isinstance(compatibility, str):
            return False, f"Compatibility must be a string, got {type(compatibility).__name__}"
        compatibility = compatibility.strip()
        if len(compatibility) > 500:
            return False, f"Compatibility is too long ({len(compatibility)} characters). Maximum is 500 characters."

    argument_hint = frontmatter.get('argument-hint')
    if argument_hint is not None:
        if not isinstance(argument_hint, str):
            return False, f"Argument-hint must be a string, got {type(argument_hint).__name__}"
        argument_hint = argument_hint.strip()
        if len(argument_hint) > 500:
            return False, f"Argument-hint is too long ({len(argument_hint)} characters). Maximum is 500 characters."

    metadata = frontmatter.get('metadata')
    if metadata is not None:
        if not isinstance(metadata, dict):
            return False, f"Metadata must be a YAML dictionary, got {type(metadata).__name__}"
        for key, value in metadata.items():
            if not isinstance(key, str):
                return False, "Metadata keys must be strings"
            if not _is_valid_metadata_value(value):
                return False, "Metadata values must be scalars, lists of scalars, or dictionaries"

    allowed_tools = frontmatter.get('allowed-tools')
    if allowed_tools is not None:
        if isinstance(allowed_tools, str):
            pass
        elif isinstance(allowed_tools, list):
            for item in allowed_tools:
                if not isinstance(item, str) or not item.strip():
                    return False, "Allowed-tools list items must be non-empty strings"
        else:
            return False, f"Allowed-tools must be a string or list of strings, got {type(allowed_tools).__name__}"

    disable_model_invocation = frontmatter.get('disable-model-invocation')
    if disable_model_invocation is not None and not isinstance(disable_model_invocation, bool):
        return False, "disable-model-invocation must be a boolean"

    user_invocable = frontmatter.get('user-invocable')
    if user_invocable is not None and not isinstance(user_invocable, bool):
        return False, "user-invocable must be a boolean"

    model = frontmatter.get('model')
    if model is not None:
        if not isinstance(model, str) or not model.strip():
            return False, "model must be a non-empty string"

    context = frontmatter.get('context')
    if context is not None:
        if not isinstance(context, str) or not context.strip():
            return False, "context must be a non-empty string"

    agent = frontmatter.get('agent')
    if agent is not None:
        if not isinstance(agent, str) or not agent.strip():
            return False, "agent must be a non-empty string"

    hooks = frontmatter.get('hooks')
    if hooks is not None:
        if not isinstance(hooks, dict):
            return False, "hooks must be a YAML dictionary"

    return True, "Skill is valid!"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python quick_validate.py <skill_directory>")
        sys.exit(1)
    
    valid, message = validate_skill(sys.argv[1])
    print(message)
    sys.exit(0 if valid else 1)
