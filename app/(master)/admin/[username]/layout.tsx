import Sidebar from "./_components/sidebar";
import Container from "./_components/container";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

const AdminLayout = async ({children}:{children: React.ReactNode}) => {


  return (
    <>
      <Header/>
      <div className="flex relative">
        <Sidebar />
        <Container>{children}</Container>
      </div>
      <Footer/>
    </>
  );
};

export default AdminLayout;
