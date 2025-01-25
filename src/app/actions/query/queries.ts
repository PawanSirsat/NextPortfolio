// src/actions/query/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { onAuthenticateUser, updateUser, uploadAndSaveImage } from "../user"
import { GitHubData, UploadAndSaveImageParams } from "../../../../utils/type"
import { fetchGitHubData } from "../github"

// Fetch current user data
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: onAuthenticateUser,
    retry: 1, // Optionally retry failed requests
  })
}

// Update user data
export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      clerkUserId,
      updates,
    }: {
      clerkUserId: string
      updates: { firstname?: string; lastname?: string; bio?: string }
    }) => updateUser(clerkUserId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

export const useUploadImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: UploadAndSaveImageParams) => {
      return await uploadAndSaveImage(params)
    },
    onError: (error: unknown) => {
      console.error("🔴 Error uploading image:", error)
    },
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })

      console.log("✅ Image uploaded successfully:", data)
    },
  })
}

// Fetch Github Repo data
export const useGitHubData = (githubRepo: string | undefined) => {
  const [, , , owner, repo] = githubRepo?.split("/") || []

  return useQuery({
    queryKey: ["githubData", owner, repo],
    queryFn: () => fetchGitHubData(owner, repo),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  })
}
