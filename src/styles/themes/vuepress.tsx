import React from "react";
export default function Theme() {
  return (
    <style jsx global>
      {`
        .markdown-body {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          color: #2c3e50;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.7;
          overflow-x: hidden;
          word-break: break-word;
        }
        .markdown-body h1 {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .markdown-body h2 {
          border-bottom: 1px solid #eaecef;
          font-size: 20px;
          font-size: 24px;
          margin-top: 50px;
          padding-bottom: 8px;
        }
        .markdown-body h3 {
          font-size: 18px;
          padding-bottom: 0;
        }
        .markdown-body h4 {
          font-size: 16px;
        }
        .markdown-body h5 {
          font-size: 14px;
        }
        .markdown-body h6 {
          font-size: 12px;
          margin-top: 4px;
        }
        .markdown-body p {
          line-height: 1.7;
          line-height: inherit;
          margin-bottom: 22px;
          margin-top: 22px;
        }
        .markdown-body img {
          max-width: 100%;
        }
        .markdown-body hr {
          border-top: 1px solid #eaecef;
          border: none;
          margin-bottom: 36px;
          margin-top: 36px;
        }
        .markdown-body code {
          background-color: rgba(27, 31, 35, 0.05);
          border-radius: 3px;
          color: #476582;
          font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
            monospace;
          font-size: 0.85em;
          font-size: 0.87em;
          font-weight: 400;
          margin: 0;
          overflow-x: auto;
          padding: 0.165em 0.5em;
          word-break: break-word;
        }
        .markdown-body pre {
          background-color: #282c34;
          border-radius: 8px;
          font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
            monospace;
          line-height: 1.7;
          overflow: auto;
          padding: 20px 24px;
          position: relative;
        }
        .markdown-body pre > code {
          color: #ffffff;
          display: block;
          font-size: 14px;
          margin: 0;
          overflow-x: auto;
          padding: 0;
          word-break: normal;
        }
        .markdown-body a {
          color: #3eaf7c;
          font-weight: 500;
          text-decoration: none;
        }
        .markdown-body a:hover {
          border-bottom: 1px solid #42b983;
          color: #42b983;
        }
        .markdown-body a:active {
          border-bottom: 1px solid #42b983;
          color: #42b983;
        }
        .markdown-body a::before {
          display: none;
        }
        .markdown-body table {
          border-collapse: collapse;
          display: inline-block !important;
          font-size: 14px;
          margin: 16px 0;
          max-width: 100%;
          overflow-x: auto;
          width: auto;
        }
        .markdown-body thead {
          background: #3eaf7c;
          color: #ffffff;
          text-align: left;
        }
        .markdown-body tr:nth-child(2n) {
          background-color: #f6f8fa;
        }
        .markdown-body th {
          border: 1px solid #eaecef;
          line-height: 22px;
          padding: 10px 16px;
        }
        .markdown-body td {
          border: 1px solid #eaecef;
          line-height: 22px;
          padding: 10px 16px;
        }
        .markdown-body blockquote {
          background-color: #f3f5f7;
          border-left: 6px solid #42b983;
          font-size: 14px;
          font-weight: 400;
          margin: 16px 0;
          padding: 4px 24px;
        }
        .markdown-body blockquote::after {
          content: "";
          display: block;
        }
        .markdown-body blockquote > p {
          margin: 16px 0;
        }
        .markdown-body ul {
          line-height: 1.7;
          padding-left: 32px;
        }
        .markdown-body ul li {
          list-style: inherit;
          margin-bottom: 0;
        }
        .markdown-body ul li.task-list-item {
          list-style: none;
        }
        .markdown-body ul li.task-list-item ul {
          margin-top: 0;
        }
        .markdown-body ul li.task-list-item ol {
          margin-top: 0;
        }
        .markdown-body ul ul {
          margin: 4px 0;
        }
        .markdown-body ul ol {
          margin: 4px 0;
        }
        .markdown-body ol {
          line-height: 1.7;
          padding-left: 32px;
        }
        .markdown-body ol li {
          list-style: inherit;
          margin-bottom: 0;
          padding-left: 4px;
        }
        .markdown-body ol li.task-list-item {
          list-style: none;
        }
        .markdown-body ol li.task-list-item ul {
          margin-top: 0;
        }
        .markdown-body ol li.task-list-item ol {
          margin-top: 0;
        }
        .markdown-body ol ul {
          margin: 4px 0;
        }
        .markdown-body ol ol {
          margin: 4px 0;
        }
        .markdown-body .contains-task-list {
          padding-left: 0;
        }
        .markdown-body .task-list-item {
          list-style: none;
        }
        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4,
        .markdown-body h5,
        .markdown-body h6 {
          font-weight: 600;
          line-height: 1.7;
          margin-bottom: 8px;
          margin-top: 36px;
          padding-bottom: 6px;
        }
        .markdown-body h1::before,
        .markdown-body h2::before,
        .markdown-body h3::before,
        .markdown-body h4::before,
        .markdown-body h5::before,
        .markdown-body h6::before {
          display: none;
        }
        @media (max-width: 720px) {
          .markdown-body h1 {
            font-size: 24px;
          }
        }
      `}
    </style>
  );
}
