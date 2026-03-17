export default function RepoCard({
  repo,
  onFavorite,
  isFavoritePage,
  isAlreadyFavorite,
}) {
  
  const repoName = repo.name;
  const repoDescription = repo.description;
  const repoStars = repo.stars ?? repo.stargazers_count;
  const repoUrl = repo.html_url;

  const repoOwner =
    typeof repo.owner === "object"
      ? repo.owner?.login
      : repo.owner;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-500 opacity-0 animate-fadeIn">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {repoName}
          </h2>

          {repoOwner && (
            <p className="text-sm text-gray-500 mt-1">
              Owner: <span className="font-medium">{repoOwner}</span>
            </p>
          )}
        </div>

        {repoStars !== undefined && (
          <div className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            ⭐ {repoStars}
          </div>
        )}
      </div>

      <p className="text-gray-500 mt-4 text-sm">
        {repoDescription || "No description available"}
      </p>

      <div className="flex justify-between items-center mt-6">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          View on GitHub →
        </a>

        <button
          onClick={() => onFavorite(repo)}
          disabled={isAlreadyFavorite && !isFavoritePage}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            isFavoritePage
              ? "bg-red-500 text-white hover:bg-red-600"
              : isAlreadyFavorite
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isFavoritePage
            ? "Remove"
            : isAlreadyFavorite
            ? "Already Added"
            : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}