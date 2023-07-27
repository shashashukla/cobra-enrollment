import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createApp, h } from "vue";
import Loader from "@/components/common/LoaderComponent.vue";
import { toast } from "vue3-toastify";

interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function showLoader() {
  const loaderApp = createApp({
    render: () => h(Loader),
  });

  const loaderComponent = loaderApp.mount(document.createElement("div")); // Mount the loader component to a temporary div

  document.body.appendChild(loaderComponent.$el);
}

function hideLoader() {
  setTimeout(() => {
    const loaderElement = document.querySelector(".loader");
    if (loaderElement) {
      loaderElement.remove(); // Remove the loader component from the DOM
    }
  }, 2000);
}

export async function get<T>(url: string): Promise<ApiResponse<T>> {
  showLoader();
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url);
    hideLoader();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    hideLoader();
    toast("Failed to fetch data", {
      autoClose: 2000,
    }); // ToastOptions
    throw error;
  }
}

export async function post<T>(url: string, data: any): Promise<void> {
  try {
    return await apiClient.post(url, data);
  } catch (error) {
    console.error("Failed to create data:", error);
    throw error;
  }
}

export async function put<T>(url: string, data: T): Promise<void> {
  try {
    await apiClient.put(url, data);
  } catch (error) {
    console.error("Failed to update data:", error);
    throw error;
  }
}

export async function deleteData(url: string): Promise<void> {
  try {
    await apiClient.delete(url);
  } catch (error) {
    console.error("Failed to delete data:", error);
    throw error;
  }
}
