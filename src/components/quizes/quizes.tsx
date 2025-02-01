"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Quiz {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}


export default function Quizes() {
  const { data: session, status } = useSession();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const singleSubject = async (id: string) => {
    // Navigate to the quiz details page
    router.replace(`/dashbord/quizes/${id}`);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!session?.token) {
        setError("No token found in session");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://exam.elevateegy.com/api/v1/subjects",
          {
            method: "GET",
            headers: {
              token: session.token,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data.subjects)) {
          setQuizzes(data.subjects as Quiz[]); // Set the subjects array directly
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
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Quizzes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
                onClick={() => singleSubject(quiz._id)} // Call the singleSubject function with the quiz ID
              >
                <img
                  src={quiz.icon} // Use the icon field from the API
                  alt={quiz.name || "Quiz Image"}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-blue-600">
                    {quiz.name}
                  </h4>
                  <p>{quiz._id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
