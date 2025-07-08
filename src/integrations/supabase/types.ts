export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      calon_mitra: {
        Row: {
          alamat: string | null
          created_at: string
          email: string
          id: string
          jenis_layanan: string | null
          kk: string
          ktp: string
          nama: string
          nomor_hp: string
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          email: string
          id?: string
          jenis_layanan?: string | null
          kk: string
          ktp: string
          nama: string
          nomor_hp: string
        }
        Update: {
          alamat?: string | null
          created_at?: string
          email?: string
          id?: string
          jenis_layanan?: string | null
          kk?: string
          ktp?: string
          nama?: string
          nomor_hp?: string
        }
        Relationships: []
      }
      komplain: {
        Row: {
          id: string
          isi_komplain: string
          mitra_id: string | null
          pesanan_id: string | null
          status: string | null
          tanggal_komplain: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          isi_komplain: string
          mitra_id?: string | null
          pesanan_id?: string | null
          status?: string | null
          tanggal_komplain?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          isi_komplain?: string
          mitra_id?: string | null
          pesanan_id?: string | null
          status?: string | null
          tanggal_komplain?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "komplain_mitra_id_fkey"
            columns: ["mitra_id"]
            isOneToOne: false
            referencedRelation: "mitras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "komplain_pesanan_id_fkey"
            columns: ["pesanan_id"]
            isOneToOne: false
            referencedRelation: "pesanan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "komplain_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      layanan: {
        Row: {
          aktif: boolean | null
          created_at: string
          deskripsi: string | null
          id: string
          kategori: string | null
          nama_layanan: string
          tarif: number
        }
        Insert: {
          aktif?: boolean | null
          created_at?: string
          deskripsi?: string | null
          id?: string
          kategori?: string | null
          nama_layanan: string
          tarif: number
        }
        Update: {
          aktif?: boolean | null
          created_at?: string
          deskripsi?: string | null
          id?: string
          kategori?: string | null
          nama_layanan?: string
          tarif?: number
        }
        Relationships: []
      }
      mitras: {
        Row: {
          alamat: string | null
          blokir: boolean | null
          created_at: string
          email: string
          id: string
          jenis_layanan: string | null
          kk: string
          ktp: string
          nama: string
          nomor_hp: string
          saldo: number | null
          status: string | null
        }
        Insert: {
          alamat?: string | null
          blokir?: boolean | null
          created_at?: string
          email: string
          id?: string
          jenis_layanan?: string | null
          kk: string
          ktp: string
          nama: string
          nomor_hp: string
          saldo?: number | null
          status?: string | null
        }
        Update: {
          alamat?: string | null
          blokir?: boolean | null
          created_at?: string
          email?: string
          id?: string
          jenis_layanan?: string | null
          kk?: string
          ktp?: string
          nama?: string
          nomor_hp?: string
          saldo?: number | null
          status?: string | null
        }
        Relationships: []
      }
      pesanan: {
        Row: {
          alamat_pesanan: string | null
          catatan: string | null
          id: string
          layanan_id: string | null
          mitra_id: string | null
          status: string | null
          tanggal_pesanan: string | null
          tanggal_selesai: string | null
          total_bayar: number | null
          user_id: string | null
        }
        Insert: {
          alamat_pesanan?: string | null
          catatan?: string | null
          id?: string
          layanan_id?: string | null
          mitra_id?: string | null
          status?: string | null
          tanggal_pesanan?: string | null
          tanggal_selesai?: string | null
          total_bayar?: number | null
          user_id?: string | null
        }
        Update: {
          alamat_pesanan?: string | null
          catatan?: string | null
          id?: string
          layanan_id?: string | null
          mitra_id?: string | null
          status?: string | null
          tanggal_pesanan?: string | null
          tanggal_selesai?: string | null
          total_bayar?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pesanan_layanan_id_fkey"
            columns: ["layanan_id"]
            isOneToOne: false
            referencedRelation: "layanan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pesanan_mitra_id_fkey"
            columns: ["mitra_id"]
            isOneToOne: false
            referencedRelation: "mitras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pesanan_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rating: {
        Row: {
          id: string
          komentar: string | null
          mitra_id: string | null
          nilai_rating: number | null
          pesanan_id: string | null
          tanggal_rating: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          komentar?: string | null
          mitra_id?: string | null
          nilai_rating?: number | null
          pesanan_id?: string | null
          tanggal_rating?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          komentar?: string | null
          mitra_id?: string | null
          nilai_rating?: number | null
          pesanan_id?: string | null
          tanggal_rating?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rating_mitra_id_fkey"
            columns: ["mitra_id"]
            isOneToOne: false
            referencedRelation: "mitras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_pesanan_id_fkey"
            columns: ["pesanan_id"]
            isOneToOne: false
            referencedRelation: "pesanan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          alamat: string | null
          created_at: string
          email: string
          id: string
          nama: string
          nomor_hp: string
          saldo: number | null
        }
        Insert: {
          alamat?: string | null
          created_at?: string
          email: string
          id?: string
          nama: string
          nomor_hp: string
          saldo?: number | null
        }
        Update: {
          alamat?: string | null
          created_at?: string
          email?: string
          id?: string
          nama?: string
          nomor_hp?: string
          saldo?: number | null
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
