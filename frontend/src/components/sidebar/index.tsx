"use client";
import React, { ElementType, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { remoteInstance } from "@/http/axios";
import ENDPOINTS from "@/http/endpoints";
import clsx from "@/lib/cn";
import {
  Home,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X as CloseIcon,
} from "lucide-react";
import { useToast } from "@/providers/SonnerProvider";
import styles from "./styles.module.css";

interface SidebarProps {
  active?: string;
}

type MenuItem = {
  key: string;
  label: string;
  href: string;
  icon: ElementType;
};

const MENU_ITEMS: MenuItem[] = [
  { key: "dashboard", label: "Panel", href: "/dashboard", icon: Home },
  {
    key: "customers",
    label: "Müşteriler",
    href: "/dashboard/customers",
    icon: Users,
  },
  { key: "logout", label: "Çıkış yap", href: "#", icon: LogOut },
];

const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await remoteInstance.post(ENDPOINTS.auth.logout);
      return response;
    },
    onSuccess: () => {
      showToast("Başarılı", "Çıkış yapıldı");
      router.push("/login");
    },
    onError: (error: any) => {
      showToast("Hata", error.message || "Çıkış yapılırken hata oluştu");
    },
  });

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  const handleToggle = () => setCollapsed((prev) => !prev);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <>
      {isMobile && (
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {mobileOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
        </button>
      )}

      <aside
        className={clsx(
          styles.sidebar,
          collapsed && !isMobile && styles.sidebarCollapsed,
          !collapsed && !isMobile && styles.sidebarExpanded,
          isMobile &&
            (mobileOpen ? styles.sidebarMobileOpen : styles.sidebarMobileClosed)
        )}
      >
        <div className={clsx(styles.headerBox, collapsed && styles.collapsed)}>
          <h4
            className={clsx(
              collapsed ? styles.collapsedPanelTitle : styles.panelTitle
            )}
          >
            {!collapsed && "Panel"}
          </h4>
          {!isMobile && (
            <button
              className={styles.btnToggle}
              onClick={handleToggle}
              aria-label={collapsed ? "Menüyü büyüt" : "Menüyü küçült"}
            >
              {collapsed ? (
                <ChevronRight className={styles.toggleIcon} />
              ) : (
                <ChevronLeft className={styles.toggleIcon} />
              )}
            </button>
          )}
        </div>

        <nav className={styles.nav}>
          {MENU_ITEMS.map(({ key, label, href, icon: Icon }) =>
            key === "logout" ? (
              <a
                key={key}
                href={href}
                className={clsx(
                  styles.link,
                  active === key && styles.linkActive
                )}
                onClick={handleLogoutClick}
              >
                <Icon className={styles.icon} />
                {!collapsed && !isMobile && (
                  <span className={styles.label}>{label}</span>
                )}
                {isMobile && <span className={styles.label}>{label}</span>}
              </a>
            ) : (
              <Link
                key={key}
                href={href}
                className={clsx(
                  styles.link,
                  active === key && styles.linkActive
                )}
                aria-current={active === key ? "page" : undefined}
                onClick={() => isMobile && setMobileOpen(false)}
              >
                <Icon className={styles.icon} />
                {!collapsed && !isMobile && (
                  <span className={styles.label}>{label}</span>
                )}
                {isMobile && <span className={styles.label}>{label}</span>}
              </Link>
            )
          )}
        </nav>
      </aside>

      {isMobile && mobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
