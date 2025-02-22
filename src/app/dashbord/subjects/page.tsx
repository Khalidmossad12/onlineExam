'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Quiz {
  _id: string;
  name: string;
  icon?: string; // Optional, in case the API doesn't always return it
}

export default function Subject() {
  const { data: session, status } = useSession();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const navigateToQuiz = (id: string) => {
    // Navigate to the quiz details page
    router.push(`/dashbord/quizes/${id}`);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!session?.token) {
        setError("No token found in session");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://exam.elevateegy.com/api/v1/subjects", {
          method: "GET",
          headers: {
            token: session.token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data.subjects)) {
          setQuizzes(data.subjects); // Set the subjects array directly
        } else {
          setError("Unexpected API response format");
        }
      } catch (err: unknown) {
        // Handle errors safely
        if (err instanceof Error) {
          setError(err.message || "An unexpected error occurred while fetching quiz details");
        } else {
          setError("An unexpected error occurred while fetching quiz details");
        }
      } finally {
        setLoading(false); // Ensure loading state is always reset
      }
    };

    if (status === "authenticated") {
      fetchQuizzes();
    }
  }, [session, status]);

  if (status === "loading" || loading) return <h1>Loading...</h1>;

  if (error) return <h1 className="text-red-500">{error}</h1>;

  return (
    <div className="p-6 bg-gray-100 ">
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-bold text-blue-600 mb-4">Quizzes</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map((quiz) => (
        <div
          key={quiz._id}
          className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => navigateToQuiz(quiz._id)} // Navigate to quiz details
        >
          {/* Icon or Image */}
          <img
            src={quiz.icon || "/default-icon.png"} // Use a default icon if not provided
            alt={quiz.name || "Quiz Image"}
            className="w-full h-40 object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-opacity duration-300"></div>
          
          {/* Quiz Name */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h4 className="text-lg font-bold text-white">{quiz.name}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
