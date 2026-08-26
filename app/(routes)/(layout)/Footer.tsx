import { prisma } from "@/lib/prisma";
import FooterContent from "../(componants)/FooterText";

const Footer = async () => {
  // Fetch doctor from database
  const doctor = await prisma.doctor.findFirst();

  if (!doctor) {
    return (
      <footer
        id="footer"
        dir="rtl"
        className="relative bg-gradient-to-b from-[#093a82] to-[#05234b] text-white overflow-hidden"
      >
        <div className="p-10 text-center">
          <p className="text-white/60">⚠️ لم يتم العثور على طبيب.</p>
        </div>
      </footer>
    );
  }

  return (
    <FooterContent
      doctor={{
        name: doctor.name,
        title: doctor.title,
        yearsExperience: doctor.yearsExperience,
        description: doctor.description,
        phone: doctor.phone,
        email: doctor.email,
        address: doctor.address,
        facebookLink: doctor.facebookLink,
        instagramLink: doctor.instagramLink,
      }}
    />
  );
};

export default Footer;
