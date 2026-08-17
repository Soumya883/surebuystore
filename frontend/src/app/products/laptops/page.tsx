import { redirect } from "next/navigation";

// Redirect /products/laptops → /products
export default function LaptopsPage() {
  redirect("/products");
}
