import Link from "next/link";

interface User {
  id: string;
  name: string;
  role: "USER" | "SELLER" | "ADMIN";
  email: string;
}

export function Footer({ data }: { data: User }) {
  return (
    <footer className="border-t bg-gray-300 ">
      <div className="container mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img className="h-12" src={"/images/MediStore.png"}/>
            <p className="text-sm text-muted-foreground">
              Your trusted online medicine shop. Buy genuine medicines from
              verified sellers with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/medicine" className="hover:text-primary">
                  Medicines
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@medistore.com</li>
              <li>Phone: +880 1234-567890</li>
              <li>Location: Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
