// Mock API service using localStorage for persistence

// Local storage keys for different entities
const STORAGE_KEYS = {
  groups: "mock_groups",
  licenses: "mock_licenses",
  servers: "mock_servers",
  users: "mock_users",
  sttProducts: "mock_stt_products",
  nmtProducts: "mock_nmt_products",
  sttLicenses: "mock_stt_licenses",
  nmtLicenses: "mock_nmt_licenses",
  auth: "mock_auth",
};

interface BaseEntity {
  id: number;
  created_at: string;
}

// Initialize mock data if not exists
const initializeMockData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.groups)) {
    const mockGroups = [
      {
        id: 1,
        name: "Admin Group",
        desc: "Administrator group",
        group_type: "admin",
        license_id: 1,
        app: "voice-translator",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "User Group",
        desc: "Regular user group",
        group_type: "user",
        license_id: 2,
        app: "voice-translator",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "Guest Group",
        desc: "Guest user group",
        group_type: "guest",
        license_id: 3,
        app: "voice-translator",
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.groups, JSON.stringify(mockGroups));
  }

  if (!localStorage.getItem(STORAGE_KEYS.licenses)) {
    const mockLicenses = [
      {
        id: 1,
        license_type: "Premium",
        server_id: 1,
        stt_id: 1,
        nmt_id: 1,
        expiration_date: "2025-12-31",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        license_type: "Standard",
        server_id: 2,
        stt_id: 2,
        nmt_id: 2,
        expiration_date: "2025-06-30",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        license_type: "Basic",
        server_id: 3,
        stt_id: 3,
        nmt_id: 3,
        expiration_date: "2025-03-31",
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.licenses, JSON.stringify(mockLicenses));
  }

  if (!localStorage.getItem(STORAGE_KEYS.servers)) {
    const mockServers = [
      {
        id: 1,
        name: "Production Server",
        key: "prod-key-001",
        frontend_endpoint: "https://prod.example.com",
        server_endpoint: "https://api.prod.example.com",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Staging Server",
        key: "stage-key-002",
        frontend_endpoint: "https://stage.example.com",
        server_endpoint: "https://api.stage.example.com",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "Development Server",
        key: "dev-key-003",
        frontend_endpoint: "https://dev.example.com",
        server_endpoint: "https://api.dev.example.com",
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.servers, JSON.stringify(mockServers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        app_account: "john.doe",
        role_id: 1,
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Jane Smith",
        app_account: "jane.smith",
        role_id: 2,
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "Bob Johnson",
        app_account: "bob.johnson",
        role_id: 3,
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(mockUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.sttProducts)) {
    const mockSTTProducts = [
      {
        id: 1,
        name: "Google Speech-to-Text",
        desc: "Google Cloud Speech-to-Text API",
        company: "Google",
        protocol: "REST",
        endpoint: "https://speech.googleapis.com",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Azure Speech Services",
        desc: "Microsoft Azure Speech Services",
        company: "Microsoft",
        protocol: "REST",
        endpoint: "https://speech.microsoft.com",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "AWS Transcribe",
        desc: "Amazon Web Services Transcribe",
        company: "Amazon",
        protocol: "REST",
        endpoint: "https://transcribe.aws.amazon.com",
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.sttProducts,
      JSON.stringify(mockSTTProducts)
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.nmtProducts)) {
    const mockNMTProducts = [
      {
        id: 1,
        name: "Google Translate",
        desc: "Google Cloud Translation API",
        company: "Google",
        protocol: "REST",
        endpoint: "https://translate.googleapis.com",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Azure Translator",
        desc: "Microsoft Azure Translator Text API",
        company: "Microsoft",
        protocol: "REST",
        endpoint: "https://translator.microsoft.com",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "AWS Translate",
        desc: "Amazon Web Services Translate",
        company: "Amazon",
        protocol: "REST",
        endpoint: "https://translate.aws.amazon.com",
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.nmtProducts,
      JSON.stringify(mockNMTProducts)
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.sttLicenses)) {
    const mockSTTLicenses = [
      {
        id: 1,
        name: "Google STT License",
        key: "goog-stt-001",
        product_id: 1,
        expiration_date: "2025-12-31",
        validation_date: "2024-01-01",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Azure STT License",
        key: "azure-stt-002",
        product_id: 2,
        expiration_date: "2025-06-30",
        validation_date: "2024-01-02",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "AWS STT License",
        key: "aws-stt-003",
        product_id: 3,
        expiration_date: "2025-03-31",
        validation_date: "2024-01-03",
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.sttLicenses,
      JSON.stringify(mockSTTLicenses)
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.nmtLicenses)) {
    const mockNMTLicenses = [
      {
        id: 1,
        name: "Google NMT License",
        key: "goog-nmt-001",
        product_id: 1,
        expiration_date: "2025-12-31",
        validation_date: "2024-01-01",
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Azure NMT License",
        key: "azure-nmt-002",
        product_id: 2,
        expiration_date: "2025-06-30",
        validation_date: "2024-01-02",
        created_at: "2024-01-02T00:00:00Z",
      },
      {
        id: 3,
        name: "AWS NMT License",
        key: "aws-nmt-003",
        product_id: 3,
        expiration_date: "2025-03-31",
        validation_date: "2024-01-03",
        created_at: "2024-01-03T00:00:00Z",
      },
    ];
    localStorage.setItem(
      STORAGE_KEYS.nmtLicenses,
      JSON.stringify(mockNMTLicenses)
    );
  }
};

// Helper functions for CRUD operations
const getFromStorage = (key: string): BaseEntity[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key: string, data: BaseEntity[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = (items: BaseEntity[]) => {
  return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
};

// Mock API class
export class MockAPI {
  constructor() {
    initializeMockData();
  }

  // Authentication
  async login(credentials: { username: string; password: string }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock authentication - accept any credentials for demo
    if (credentials.username && credentials.password) {
      const token = "mock-jwt-token-" + Date.now();
      const role = credentials.username === "admin" ? "admin" : "user";

      localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({ token, role }));

      return {
        data: { token, role },
      };
    } else {
      throw new Error("Invalid credentials");
    }
  }

  // Generic CRUD operations
  async getAll(entity: string) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const key = STORAGE_KEYS[entity as keyof typeof STORAGE_KEYS];
    const items = getFromStorage(key);

    // Return in the expected format
    const entityKey =
      entity === "sttProducts" || entity === "nmtProducts"
        ? "products"
        : entity === "sttLicenses" || entity === "nmtLicenses"
          ? "licenses"
          : entity;

    return {
      data: { [entityKey]: items },
    };
  }

  async getById(entity: string, id: string | number) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const key = STORAGE_KEYS[entity as keyof typeof STORAGE_KEYS];
    const items = getFromStorage(key);
    const item = items.find(
      (item: BaseEntity) => item.id === parseInt(id.toString())
    );

    if (!item) {
      throw new Error(`${entity} not found`);
    }

    return { data: item };
  }

  async create(entity: string, data: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const key = STORAGE_KEYS[entity as keyof typeof STORAGE_KEYS];
    const items = getFromStorage(key);

    const newItem = {
      ...data,
      id: generateId(items),
      created_at: new Date().toISOString(),
    } as BaseEntity;

    items.push(newItem);
    saveToStorage(key, items);

    return { data: newItem };
  }

  async update(
    entity: string,
    id: string | number,
    data: Record<string, unknown>
  ) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const key = STORAGE_KEYS[entity as keyof typeof STORAGE_KEYS];
    const items = getFromStorage(key);
    const index = items.findIndex(
      (item: BaseEntity) => item.id === parseInt(id.toString())
    );

    if (index === -1) {
      throw new Error(`${entity} not found`);
    }

    items[index] = { ...items[index], ...data } as BaseEntity;
    saveToStorage(key, items);

    return { data: items[index] };
  }

  async delete(entity: string, id: string | number) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const key = STORAGE_KEYS[entity as keyof typeof STORAGE_KEYS];
    const items = getFromStorage(key);
    const index = items.findIndex(
      (item: BaseEntity) => item.id === parseInt(id.toString())
    );

    if (index === -1) {
      throw new Error(`${entity} not found`);
    }

    items.splice(index, 1);
    saveToStorage(key, items);

    return { data: { message: "Deleted successfully" } };
  }
}

export const mockAPI = new MockAPI();
