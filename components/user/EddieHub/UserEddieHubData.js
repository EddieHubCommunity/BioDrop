import UserEddieHubDataItem from "./UserEddieHubDataItem";

export default function UserEddiehubData({ data }) {
  const items = [
    {
      amount: data.issues,
      label: "Issues",
    },
    {
      amount: data.issueComment,
      label: "Issue Comments",
    },
    {
      amount: data.pullRequest,
      label: "Pull Requests",
    },
    {
      amount: data.pullRequestReview,
      label: "Pull Request Reviews",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
      {items.map((item, i) => (
        <UserEddieHubDataItem key={i} amount={item.amount} label={item.label} />
      ))}
    </div>
  );
}
