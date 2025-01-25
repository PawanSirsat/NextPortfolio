// components/MarkdownRenderer.tsx
import React from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]} // Enable GitHub-flavored Markdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-4xl font-bold my-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-semibold my-3" {...props} />
        ),
        p: ({ node, ...props }) => <p className="text-base my-2" {...props} />,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        // Optional: Customize rendering of other markdown elements (tables, task lists, etc.)
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-5" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-5" {...props} />
        ),
      }}
    />
  )
}

export default MarkdownRenderer
