interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    status: number;
  }
  
  const getBaseUrl = (): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("Base URL is not defined in environment variables.");
    }
    return baseUrl;
  };
  
  const fetchApi = async <S = undefined, T = unknown>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: S
  ): Promise<ApiResponse<T>> => {
    try {
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}/${endpoint}`;
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
  
      const options: RequestInit = {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      };
  
      const response = await fetch(url, options);
  
      // Check if the response content type is JSON
      const isJson = response.headers
        .get("Content-Type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : null;
  
      if (!response.ok) {
        throw new Error(
          data?.message || `HTTP error! Status: ${response.status}`
        );
      }
  
      return {
        success: true,
        data: data as T,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message || "An unknown error occurred.",
        status: 500,
      };
    }
  };
  
  export const getData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return fetchApi<undefined, T>(endpoint, "GET");
  };
  
  export const postData = async <S, T>(
    endpoint: string,
    body: S
  ): Promise<ApiResponse<T>> => {
    return fetchApi<S, T>(endpoint, "POST", body);
  };
  
  export const putData = async <S, T>(
    endpoint: string,
    body: S
  ): Promise<ApiResponse<T>> => {
    return fetchApi<S, T>(endpoint, "PUT", body);
  };
  
  export const patchData = async <S, T>(
    endpoint: string,
    body: S
  ): Promise<ApiResponse<T>> => {
    return fetchApi<S, T>(endpoint, "PATCH", body);
  };
  
  export const deleteData = async <T>(
    endpoint: string
  ): Promise<ApiResponse<T>> => {
    return fetchApi<undefined, T>(endpoint, "DELETE");
  };
  
  