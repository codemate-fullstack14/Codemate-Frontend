import { Outlet } from "react-router-dom";
import Header from "./header";
import { useAuthStore } from "../../store/authStore";
import ChatBox from "../chat";

function LayoutContainer() {
  const { user, initialized } = useAuthStore();

  const renderChat = () => {
    if (!initialized) return <div>로딩 중...</div>;
    if (!user) return <div>로그인이 필요합니다.</div>;
    return <ChatBox />;
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto relative">
        <Outlet />
        {renderChat()}
      </div>
    </>
  );
}

export default LayoutContainer;
