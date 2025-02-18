import { ProjectCardProps } from "./type";

// export const dummyProjects: ProjectCardProps[] = [
//   {
//     title: "E-commerce Platform",
//     description:
//       "A full-stack e-commerce solution with user authentication and payment integration.",
//     media: "",
//     technologies: ["React", "Node", "TypeScript"],
//     liveDemo: "https://example-ecommerce.com",
//     githubRepo: "https://github.com/PawanSirsat/SplitWise",
//     status: "Completed",
//     updatedAt?: "2023-05-15",
//     stars: 120,
//     forks: 35,
//     views: 1500,
//   },
//   {
//     name: "Task Management App",
//     description:
//       "A Kanban-style task management application with real-time updates.",
//     image: "",
//     technologies: ["Vue", "Django", "Python"],
//     liveDemo: "https://task-manager-example.com",
//     githubRepo: "https://github.com/username/task-management-app",
//     status: "In Progress",
//     lastUpdated: "2023-05-10",
//     stars: 85,
//     forks: 20,
//     views: 950,
//   },
//   {
//     name: "Social Media Dashboard",
//     description:
//       "An analytics dashboard for social media managers with data visualization.",
//     image: "",
//     technologies: ["Angular", "Flask", "TypeScript"],
//     liveDemo: "https://social-dashboard-demo.com",
//     githubRepo: "https://github.com/username/social-media-dashboard",
//     status: "Completed",
//     lastUpdated: "2023-05-05",
//     stars: 200,
//     forks: 50,
//     views: 2500,
//   },
//   {
//     name: "Fitness Tracker",
//     description:
//       "A mobile-first fitness tracking app with workout plans and progress charts.",
//     image: "",
//     technologies: ["React", "Rails", "JavaScript"],
//     liveDemo: "https://fitness-tracker-example.com",
//     githubRepo: "https://github.com/username/fitness-tracker",
//     status: "In Progress",
//     lastUpdated: "2023-04-30",
//     stars: 150,
//     forks: 40,
//     views: 1800,
//   },
//   {
//     name: "AI-powered Chatbot",
//     description:
//       "An intelligent chatbot for customer support with natural language processing.",
//     image: "",
//     technologies: ["Python", "React", "TypeScript"],
//     liveDemo: "https://ai-chatbot-demo.com",
//     githubRepo: "https://github.com/username/ai-chatbot",
//     status: "Archived",
//     lastUpdated: "2023-04-25",
//     stars: 300,
//     forks: 75,
//     views: 3500,
//   },
// ];

export const dummyArticles = [
  {
    title: "The Future of AI in Web Development",
    excerpt:
      "Exploring how artificial intelligence is reshaping the landscape of web development and what it means for developers.",
    image: "",
    date: "2023-05-15",
    readTime: "5 min read",
    tags: ["AI", "Web Development", "Future Tech"],
  },
  {
    title: "Mastering React Hooks",
    excerpt:
      "A comprehensive guide to using React Hooks effectively in your projects, with practical examples and best practices.",
    image: "",
    date: "2023-05-10",
    readTime: "8 min read",
    tags: ["React", "Hooks", "JavaScript"],
  },
  {
    title: "Building Scalable APIs with GraphQL",
    excerpt:
      "Learn how to design and implement scalable APIs using GraphQL, and why it's becoming a popular alternative to REST.",
    image: "",
    date: "2023-05-05",
    readTime: "6 min read",
    tags: ["GraphQL", "API", "Backend"],
  },
  {
    title: "The Rise of JAMstack",
    excerpt:
      "Discover the benefits of JAMstack architecture and how it's changing the way we build and deploy web applications.",
    image: "",
    date: "2023-04-30",
    readTime: "7 min read",
    tags: ["JAMstack", "Web Architecture", "Performance"],
  },
  {
    title: "Accessibility in Modern Web Design",
    excerpt:
      "Why accessibility should be a priority in web design and development, with practical tips for creating inclusive websites.",
    image: "",
    date: "2023-04-25",
    readTime: "6 min read",
    tags: ["Accessibility", "Web Design", "UX"],
  },
];

// content.ts
export const content = `
### 🤝 **Looking for Collaborators**

I’m actively looking for collaborators to help add new features and enhance this project further!

If you have ideas, expertise, or just the enthusiasm to contribute, feel free to:

- Fork this repository and start contributing.
- Reach out to me at [p1.sirsat1998@gmail.com](mailto:p1.sirsat1998@gmail.com) to discuss ideas or ask questions.

✨ **Together, we can make this project even better!** ✨

---

# **📄 SplitWise Clone Installation Guide**

### 📚 **Table of Contents**

1. [📥 Clone the Repository](#-1-clone-the-repository)
2. [📦 Install Dependencies](#-2-install-dependencies)
3. [🎨 Install and Configure Tailwind CSS](#-3-install-and-configure-tailwind-css)
4. [🗄️ Setup Appwrite (Database Configuration)](#-4-setup-appwrite-database-configuration)
   - [🔑 Create an Appwrite Account](#-step-1-create-an-appwrite-account)
   - [📁 Create a New Project](#-step-2-create-a-new-project)
   - [🛠️ Setup the Database](#-step-3-setup-the-database)
   - [🏗️ Create Collections](#-step-4-create-collections)
   - [🔒 Update Collection Permissions](#-step-5-update-collection-permissions)
   - [🔑 Copy IDs to .env File](#-step-6-copy-ids-to-env-file)
5. [🚀 Run the Project](#-5-run-the-project)
6. [🌐 Deploy on Vercel](#-6-deploy-on-vercel)
   - [🔌 Configure Appwrite Integration](#-configure-appwrite-integration)
7. [📧 Need Help?](#-need-help)
8. [🎥 Appwrite Database Guide Video](#-appwrite-database-guide-video)
9. [📑 Documentation](#-documentation)
   - [📂 Google Drive](#google-drive)
   - [📄 DOC PDF](#doc-pdf)
10. [📊 Database Design](#-database-design)
11. [🔄 Flowchart](#-flowchart)
12. [💸 Simplify Debt Flowchart](#-simplify-debt-flowchart)

### 📥 **1. Clone the Repository**

Begin by cloning the SplitWise repository to your local machine:
\`\`\`js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
\`\`\`
bash
git clone https://github.com/PawanSirsat/SplitWise.git


### 📦 **2. Install Dependencies**

Navigate to the project directory and install the required Node.js packages:

bash
cd splitwise
npm install

`;
