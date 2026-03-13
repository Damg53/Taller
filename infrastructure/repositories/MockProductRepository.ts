import { Product } from "@/core/domain/Product";
import { ProductRepository } from "@/core/domain/repositories/ProductRepository";

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Café Americano",
    price: 6400,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGWOuIgB5Gq8SsOTpcqcqkjfbjih8a7AufcNpwI3vRK_disuOeUHQ9HR7OhqhcLpwJ9GnQLtDp2N2ZLXmwvhuCk3BfIfEFEDANmgy6CwLtbX7nQqgLSHhf-4SVlqaNVuC5DyKkpb22osAMvoM5m-ea4YpERmcrMdIT04wngMslsXy-nIok9--YR9-cM0Dpwx3mzrjSuJI7Xrx6FVZ-6oqUFfd-2fc_5TC_V-p4dRllSHfIy63mK4_9VRAZONxTBfH4hDvEwsBuIq9w",
    category: "Bebidas",
    stock: 100,
  },
  {
    id: "p2",
    name: "Empanada de Carne",
    price: 8000,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDW9RvFneUfbJn52QjRm2YHfmnsotr7RZTzOnVpJ6NZfeY-joj7enGzW7pnAlnAd4dR8vUgGcfSLhrxVRlWPnPMpQ23PNtefQNGt_0_mJiZkcGTZlkIdPtSiubQh2KqjwYkwTaQOxEvwpLSnJn9-yfopV8T_ca-sNj_vbsb4glN749JwtpCIcPAFNeyfpnJ42-ZRtMz1XKb49be2ofiHKKFQgnjZIXK4-2_aGdOmr0gxPxcqZbhpFYwndKf0JkJlOj6MAIcZ_pEh95f",
    category: "Snacks",
    stock: 50,
  },
  {
    id: "p3",
    name: "Jugo Natural 12oz",
    price: 10000,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXNtdEyCKYWYXXpOLmrL_Zct2Gyx8gnxcphgWwwheFDu_qw5t7lKfg1OXyAJbOF2bsdWVzf_4L2NzrAOZX_o4ouJJC9Evs25XxmME1nKYgu0FIEJak2JIQ9XmploP8Kc0QXGwlGcppLcIMFQvNy7c9sGqZou__N2fEnAnNo8T_Qd2aKF06V9YhuBict4IL_4l_hWBF7QSlIGx4G8tsb0ovxe2wAkzh2aWyInpCGrb27WF8CXDgofit5KmdiolUYmuQOXKilrYQU1ez",
    category: "Bebidas",
    stock: 30,
  },
  {
    id: "p4",
    name: "Sandwich Jamón/Queso",
    price: 15000,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ2zCa25TH9ZOkclhesWkY3BayAqtgi--CNZvOthN9DBa153ZP03KYfEPH9UiOuRGMz3PfliZ5V_8rDrjZfvJ0T4hwKrHaohY8kJEqs5-dwEhSD_LQOJBV0K9f9M9FKDlq88N8xExyqZgVnPXQ8fApRpeD_vN7cTRHM2nKbR-0_pwgcykMkWuKuIpA5WoaCwKhL7jcqfAO9kU2-eVe_2xX4rBYUv2XEc3XgGQp1FrpISpLeNu8lL0QRnIwvewJl7r5Cc9B91vs8e3_",
    category: "Sandwiches",
    stock: 0,
  },
  {
    id: "p5",
    name: "Hamburguesa Clásica",
    price: 25000,
    imageUrl: "https://picsum.photos/seed/burger/400/400",
    category: "Comida Rápida",
    stock: 45,
  },
  {
    id: "p6",
    name: "Ensalada César",
    price: 18000,
    imageUrl: "https://picsum.photos/seed/salad/400/400",
    category: "Saludable",
    stock: 12,
  },
];

export class MockProductRepository implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    return [...mockProducts];
  }

  async getProductById(id: string): Promise<Product | null> {
    return mockProducts.find((p) => p.id === id) || null;
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    const product = mockProducts.find((p) => p.id === id);
    if (product) {
      product.stock = quantity;
    }
  }
}
