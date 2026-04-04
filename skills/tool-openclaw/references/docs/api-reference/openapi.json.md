<!-- SNAPSHOT: source_url=https://docs.openclaw.ai/api-reference/openapi.json; fetched_at=2026-04-04T20:36:05.327Z; sha256=919eb7a392aafe9825cc9fc0e5b2174643803e1f825816a5a2cb95fb20a94aa9; content_type=application/octet-stream, application/json; status=ok -->

{
  "openapi": "3.1.0",
  "info": {
    "title": "OpenAPI Plant Store",
    "description": "A sample API that uses a plant store as an example to demonstrate features in the OpenAPI specification",
    "license": {
      "name": "MIT"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://sandbox.mintlify.com"
    }
  ],
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/plants": {
      "get": {
        "description": "Returns all plants from the system that the user has access to",
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "description": "The maximum number of results to return",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Plant response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Plant"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "description": "Creates a new plant in the store",
        "requestBody": {
          "description": "Plant to add to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewPlant"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "plant response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Plant"
                }
              }
            }
          },
          "400": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/plants/{id}": {
      "delete": {
        "description": "Deletes a single plant based on the ID supplied",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of plant to delete",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Plant deleted",
            "content": {}
          },
          "400": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    }
  },
  "webhooks": {
    "/plant/webhook": {
      "post": {
        "description": "Information about a new plant added to the store",
        "requestBody": {
          "description": "Plant added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewPlant"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Return a 200 status to indicate that the data was received successfully"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Plant": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "description": "The name of the plant",
            "type": "string"
          },
          "tag": {
            "description": "Tag to specify the type",
            "type": "string"
          }
        }
      },
      "NewPlant": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Plant"
          },
          {
            "required": [
              "id"
            ],
            "type": "object",
            "properties": {
              "id": {
                "description": "Identification number of the plant",
                "type": "integer",
                "format": "int64"
              }
            }
          }
        ]
      },
      "Error": {
        "required": [
          "error",
          "message"
        ],
        "type": "object",
        "properties": {
          "error": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  }
}
