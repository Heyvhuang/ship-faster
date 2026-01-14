export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      assets: {
        Row: {
          aspect_ratio: string | null
          batch_id: string
          checksum: string
          created_at: string | null
          file_size: number | null
          filename: string
          height: number | null
          id: string
          kind: string
          mime_type: string
          original_filename: string
          project_id: string
          public_url: string | null
          sha256: string | null
          size: number
          storage_path: string
          width: number | null
        }
        Insert: {
          aspect_ratio?: string | null
          batch_id: string
          checksum: string
          created_at?: string | null
          file_size?: number | null
          filename: string
          height?: number | null
          id?: string
          kind: string
          mime_type: string
          original_filename: string
          project_id: string
          public_url?: string | null
          sha256?: string | null
          size: number
          storage_path: string
          width?: number | null
        }
        Update: {
          aspect_ratio?: string | null
          batch_id?: string
          checksum?: string
          created_at?: string | null
          file_size?: number | null
          filename?: string
          height?: number | null
          id?: string
          kind?: string
          mime_type?: string
          original_filename?: string
          project_id?: string
          public_url?: string | null
          sha256?: string | null
          size?: number
          storage_path?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          created_at: string | null
          id: string
          name: string
          project_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          project_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          project_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batches_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          brand_notes: string | null
          created_at: string | null
          default_recipe: Json | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          brand_notes?: string | null
          created_at?: string | null
          default_recipe?: Json | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          brand_notes?: string | null
          created_at?: string | null
          default_recipe?: Json | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          asset_id: string | null
          bbox: Json
          confidence: number | null
          context: string | null
          created_at: string | null
          id: string
          key: string
          overflow_detected: boolean | null
          processed_texts: Json | null
          run_id: string
          source_text: string
        }
        Insert: {
          asset_id?: string | null
          bbox: Json
          confidence?: number | null
          context?: string | null
          created_at?: string | null
          id?: string
          key: string
          overflow_detected?: boolean | null
          processed_texts?: Json | null
          run_id: string
          source_text: string
        }
        Update: {
          asset_id?: string | null
          bbox?: Json
          confidence?: number | null
          context?: string | null
          created_at?: string | null
          id?: string
          key?: string
          overflow_detected?: boolean | null
          processed_texts?: Json | null
          run_id?: string
          source_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "regions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regions_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
        ]
      }
      run_checkpoints: {
        Row: {
          created_at: string | null
          id: string
          language_code: string
          output_asset_id: string | null
          run_id: string
          translation_hash: string
          variant_index: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          language_code: string
          output_asset_id?: string | null
          run_id: string
          translation_hash: string
          variant_index?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          language_code?: string
          output_asset_id?: string | null
          run_id?: string
          translation_hash?: string
          variant_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "run_checkpoints_output_asset_id_fkey"
            columns: ["output_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "run_checkpoints_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
        ]
      }
      run_outputs: {
        Row: {
          asset_id: string
          created_at: string | null
          id: string
          language_code: string
          run_id: string
          variant_index: number
        }
        Insert: {
          asset_id: string
          created_at?: string | null
          id?: string
          language_code: string
          run_id: string
          variant_index?: number
        }
        Update: {
          asset_id?: string
          created_at?: string | null
          id?: string
          language_code?: string
          run_id?: string
          variant_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "run_outputs_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "run_outputs_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
        ]
      }
      runs: {
        Row: {
          batch_id: string
          completed_at: string | null
          created_at: string | null
          error: string | null
          id: string
          languages: Json
          progress: Json | null
          project_id: string
          recipe: Json
          retries: number | null
          source_asset_id: string | null
          stage: string | null
          started_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          batch_id: string
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          id?: string
          languages?: Json
          progress?: Json | null
          project_id: string
          recipe: Json
          retries?: number | null
          source_asset_id?: string | null
          stage?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_id?: string
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          id?: string
          languages?: Json
          progress?: Json | null
          project_id?: string
          recipe?: Json
          retries?: number | null
          source_asset_id?: string | null
          stage?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "runs_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "runs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "runs_source_asset_id_fkey"
            columns: ["source_asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      share_links: {
        Row: {
          created_at: string | null
          download_count: number | null
          download_path: string | null
          expires_at: string
          id: string
          run_id: string
          token: string
        }
        Insert: {
          created_at?: string | null
          download_count?: number | null
          download_path?: string | null
          expires_at: string
          id?: string
          run_id: string
          token: string
        }
        Update: {
          created_at?: string | null
          download_count?: number | null
          download_path?: string | null
          expires_at?: string
          id?: string
          run_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "share_links_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "runs"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_events: {
        Row: {
          created_at: string | null
          id: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          type?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          credits_balance: number | null
          display_name: string | null
          email: string
          id: string
          plan: string | null
          role: string
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credits_balance?: number | null
          display_name?: string | null
          email: string
          id: string
          plan?: string | null
          role?: string
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credits_balance?: number | null
          display_name?: string | null
          email?: string
          id?: string
          plan?: string | null
          role?: string
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
