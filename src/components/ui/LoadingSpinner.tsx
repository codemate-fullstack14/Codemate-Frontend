interface LoadingSpinnerProps {
  text?: string; // 하단 텍스트
  dotColor?: string; // 점 색상
  size?: number; // 점 크기 기본값 8px
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "로딩중",
  dotColor = "bg-blue-500",
  size = 8,
}) => {
  const dots = [0, 1, 2];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-full">
      <div className="flex gap-2 mb-2">
        {dots.map((_, idx) => (
          <span
            key={idx}
            className={`${dotColor} rounded-full inline-block animate-bounce`}
            style={{
              width: size,
              height: size,
              animationDelay: `${idx * 0.2}s`, // 서로 다른 시간차
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
