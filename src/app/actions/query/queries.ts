// src/actions/query/queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserByUsername,
  onAuthenticateUser,
  updateUser,
  uploadAndSaveImage,
  uploadImage,
} from "../user";
import {
  getProjectsByUserId,
  deleteProject,
  getProjectById,
  getProjects,
} from "../project";
import {
  UploadAndSaveImageParams,
  UploadImageParams,
} from "../../../../utils/type";
import { fetchGitHubData } from "../github";

// Fetch current user data
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: onAuthenticateUser,
    retry: 1,
  });
};

// User By UserName
export const fetchUserByUsername = (username: string) => {
  return useQuery({
    queryKey: ["UserByUserName", username],
    queryFn: () => getUserByUsername(username),
    retry: 1,
    enabled: !!username,
  });
};
// Update user data
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      clerkUserId,
      updates,
    }: {
      clerkUserId: string;
      updates: {
        firstname?: string;
        lastname?: string;
        bio?: string;
        username?: string;
      };
    }) => updateUser(clerkUserId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UploadAndSaveImageParams) => {
      return await uploadAndSaveImage(params);
    },
    onError: (error: unknown) => {
      console.error("🔴 Error uploading image:", error);
    },
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      console.log("✅ Image uploaded successfully:", data);
    },
  });
};

export const useUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UploadImageParams) => {
      return await uploadImage(params);
    },
    onError: (error: unknown) => {
      console.error("🔴 Error uploading image:", error);
    },
    onSuccess: (data: string) => {
      queryClient.invalidateQueries({ queryKey: ["upload"] });
      console.log("✅ Image uploaded successfully:", data);
    },
  });
};

// Fetch Github Repo data
export const useGitHubData = (githubRepo: string | undefined) => {
  const [, , , owner, repo] = githubRepo?.split("/") || [];

  return useQuery({
    queryKey: ["githubData", owner, repo],
    queryFn: () => fetchGitHubData(owner, repo),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
};

// export const useCreateProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       projectData,
//       userId,
//     }: {
//       projectData: ProjectFormValues;
//       userId: string;
//     }) => createProject(projectData, userId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["projects"] });
//     },
//   });
// };

// All Project By UserID
export const useProjectsByUserId = () => {
  return useQuery({
    queryKey: ["userprojects"],
    queryFn: () => getProjectsByUserId(),
  });
};

//Project bY Project Id
export const useProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ["projectbyid", projectId],
    queryFn: () => getProjectById(projectId),
  });
};

// Get all Projects (with Pagination)
export const useAllProject = () => {
  return useQuery({
    queryKey: ["allproject"],
    queryFn: () => getProjects(),
  });
};

// export const useUpdateProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       projectId,
//       updates,
//     }: {
//       projectId: string;
//       updates: Partial<ProjectFormValues>;
//     }) => updateProject(projectId, updates),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["projects"] });
//     },
//   });
// };

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
