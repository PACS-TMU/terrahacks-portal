"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";

export default function ProtectedPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getUser');
        const result = await response.json();

        if (response.ok) {
          setUser(result.user);
        } else {
          console.error('Failed to fetch user data: ', result.error);
          setLoading(false);
          router.push('/login');
        }
      } catch (err) {
        console.error('Failed to fetch user data: ', err);
        setLoading(false);
        router.push('/login');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user !== null) {
      router.push('/dashboard');
    } else if (!loading) {
      router.push('/login');
    }
  }, [user, loading]);

  if (loading) {
    return <Loading />;
  }

  return null; // or any other fallback UI if needed
}
