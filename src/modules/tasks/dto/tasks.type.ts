export interface Tasks {
    id: number;
    name: string;
    description: string;
    status: boolean;
    userId: number;      // <--- Agrega esto
    tenant_id?: string;  // <--- Opcional, si lo usas
}