
import Main1 from "@/components/Main1";
import Main2 from "@/components/Main2";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Main1 />
      <Main2 
        title="Prompting human potential." 
        subtitle="What if AI wasn't designed to be prompted? What if it was designed to prompt us?"
        description="Rather than building AI that offers answers and outputs, we aspire to build AI-powered tools and technologies that prompt human potential."
        ctaText=""
      />
    </main>
  );
};

export default Index;
