import React from "react";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FaGithub, FaGlobe } from "react-icons/fa";

function ProjectCard({ project, index }) {
  return (
    <li className="py-4 border-l-2 mb-4 pl-2 hover:border-l-4 pr-2 shadow-md">
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={project.url}
              key={index}
              target="_blank"
              rel="noreferrer"
              className="text-lg lg:text-xl tracking-wide font-medium capitalize"
            >
              {project.title}
            </Link>
            <ReactMarkdown className="text-md text-gray-500 py-1 flex-wrap">
              {project.description}
            </ReactMarkdown>
            <div className="flex flex-col my-4">
              <div className="flex flex-wrap">
                {project.techUsed.map((tag, index) => (
                  <Link
                    href={`/search?search=${tag}`}
                    key={index}
                    className="flex flex-row p-1 m-2 rounded-lg text-sm font-mono border-2 border-dashed cursor-pointer shadow-none hover:shadow-md"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-center my-4">
              <a
                href={project.githubrepo}
                target="_blank"
                rel="noreferrer"
                className="bg-stone-900 text-white font-bold py-2 px-4 rounded-full mr-4"
              >
                <FaGithub size={20} />
              </a>
              {project.url !== "" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  <FaGlobe size={20} />
                </a>
              )}
            </div>
          </div>

          <div className="isolate flex -space-x-1 overflow-hidden">
            {project.contributors?.map((contributor, index) => {
              return (
                <a
                  href={contributor.url}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  <img
                    className={`relative z-
                    ${
                      10 * index
                    } inline-block h-10 w-10 rounded-full ring-2 ring-white`}
                    src={contributor.avatar}
                    alt=""
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
