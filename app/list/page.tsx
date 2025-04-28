"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { Search, ArrowUpDown, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_PORT, API_URL } from "config/constants";

// User data from the provided JSON
// const initialUsers = [
//   {
//     id: 122374,
//     name: "Mohanlal",
//     email: "mohanlal@example.com",
//     mobile: "9876543210",
//   },
//   {
//     id: 122375,
//     name: "Mammootty",
//     email: "mammootty@example.com",
//     mobile: "9876543211",
//   },
//   {
//     id: 122376,
//     name: "Dulquer Salmaan",
//     email: "dulquer@example.com",
//     mobile: "9876543212",
//   },
//   {
//     id: 122377,
//     name: "Fahadh Faasil",
//     email: "fahadh@example.com",
//     mobile: "9876543213",
//   },
//   {
//     id: 122378,
//     name: "Prithviraj Sukumaran",
//     email: "prithviraj@example.com",
//     mobile: "9876543214",
//   },
//   {
//     id: 122379,
//     name: "Tovino Thomas",
//     email: "tovino@example.com",
//     mobile: "9876543215",
//   },
//   {
//     id: 122380,
//     name: "Nivin Pauly",
//     email: "nivin@example.com",
//     mobile: "9876543216",
//   },
//   {
//     id: 122381,
//     name: "Suresh Gopi",
//     email: "suresh@example.com",
//     mobile: "9876543217",
//   },
//   {
//     id: 122382,
//     name: "Jayasurya",
//     email: "jayasurya@example.com",
//     mobile: "9876543218",
//   },
//   {
//     id: 122383,
//     name: "Kunchacko Boban",
//     email: "kunchacko@example.com",
//     mobile: "9876543219",
//   },
// ];

type User = {
  id: number;
  name: string;
  email: string;
  mobile: string;
};
type SortKey = keyof User;
type SortDirection = "asc" | "desc";

export default function UserTable() {
  const Router = useRouter();
  const [initialUsers, setInitialUser] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({ key: "id", direction: "asc" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  console.log({ loading });

  const getData = async () => {
    try {
      //   const response = await fetch(
      //     "http://192.168.100.174:8081/userDemo-0.0.1-SNAPSHOT/users"
      //   );

      const response = await fetch(
        `${API_URL}:${API_PORT}/user_project-0.0.1-SNAPSHOT/users`
      );

      // Check if the response is OK (status 200)
      if (!response.ok) {
        setLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const usersData = await response.json();
      setInitialUser(usersData);
      setUsers(usersData);
      setError(null); // Reset error if successful
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      // Handle different types of errors
      // @ts-expect-error to bypass error
      if (err.name === "TypeError" && err.message.includes("CORS")) {
        setError(
          "Cross-Origin Request Blocked: The server is not configured to allow CORS."
        );
      } else {
        setError("An error occurred while fetching the data.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setUsers(initialUsers);
      return;
    }

    const filteredUsers = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.mobile.includes(value) ||
        user.id.toString().includes(value)
    );

    setUsers(filteredUsers);
  };

  // Handle sorting
  const requestSort = (key: SortKey) => {
    let direction: SortDirection = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 transition-colors duration-200">
      <div className="flex justify-end mb-2">
        <Button
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
          onClick={() => Router.replace("/")}
        >
          Logout
        </Button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading ? (
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, or mobile..."
                className="pl-10 h-12 bg-background border-border focus-visible:ring-primary"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow className="hover:bg-muted/80">
                    <TableHead className="w-[80px]">
                      <Button
                        variant="ghost"
                        onClick={() => requestSort("id")}
                        className="flex items-center gap-1 font-medium hover:text-primary"
                      >
                        ID
                        <ArrowUpDown className="h-4 w-4 transition-transform duration-200" />
                        {getSortDirectionIndicator("id")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => requestSort("name")}
                        className="flex items-center gap-1 font-medium hover:text-primary"
                      >
                        Name
                        <ArrowUpDown className="h-4 w-4 transition-transform duration-200" />
                        {getSortDirectionIndicator("name")}
                      </Button>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <Button
                        variant="ghost"
                        onClick={() => requestSort("email")}
                        className="flex items-center gap-1 font-medium hover:text-primary"
                      >
                        Email
                        <ArrowUpDown className="h-4 w-4 transition-transform duration-200" />
                        {getSortDirectionIndicator("email")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => requestSort("mobile")}
                        className="flex items-center gap-1 font-medium hover:text-primary"
                      >
                        Mobile
                        <ArrowUpDown className="h-4 w-4 transition-transform duration-200" />
                        {getSortDirectionIndicator("mobile")}
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <TableRow
                        key={user.id}
                        className={`
                        ${index % 2 === 0 ? "bg-background" : "bg-muted/30"} 
                        transition-colors duration-150 hover:bg-primary/5
                      `}
                      >
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.mobile}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-muted-foreground flex justify-between items-center">
              <span>
                Showing {users.length} of {initialUsers.length} users
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsers(initialUsers);
                  setSearchTerm("");
                }}
                className={searchTerm ? "opacity-100" : "opacity-0"}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex space-x-2 items-center">
            <Loader className="animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
