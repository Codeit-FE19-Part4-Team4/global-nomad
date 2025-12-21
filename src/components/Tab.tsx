const mockdata = [
  { id: 1, content: '신청', number: 2 },
  { id: 2, content: '승인', number: 3 },
  { id: 3, content: '거절', number: 0 },
];
export default function Tab() {
  return (
    <div className="flex justify-start gap-2 border-b border-gray-100">
      {mockdata.map((data) => (
        <div
          key={data.id}
          className="flex flex-1 justify-center gap-1 px-3.5 py-[11px]">
          <span>{data.content}</span>
          <span>{data.number}</span>
        </div>
      ))}
    </div>
  );
}
