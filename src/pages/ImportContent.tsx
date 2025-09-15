
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Video, Image, Link, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

const ImportContent = () => {
  const [selectedType, setSelectedType] = useState<string>("text");
  const [isUploading, setIsUploading] = useState(false);
  
  const contentTypes = [
    { id: "text", label: "Text Content", icon: FileText, description: "Import articles, notes, or documents" },
    { id: "video", label: "Video Content", icon: Video, description: "Upload video tutorials or lectures" },
    { id: "image", label: "Image Content", icon: Image, description: "Add images, diagrams, or infographics" },
    { id: "link", label: "Web Content", icon: Link, description: "Import from URLs or external sources" }
  ];

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Content imported successfully!");
    }, 2000);
  };

  return (
    <RefinedPageLayout title="Import Content" backUrl="/dashboard">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-forest-light border border-mint/10 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Choose Content Type</h2>
            <p className="text-white/70">
              Select the type of content you want to import to your learning library
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {contentTypes.map((type) => (
              <Card
                key={type.id}
                className={`p-4 cursor-pointer transition-all hover-scale ${
                  selectedType === type.id
                    ? "bg-mint/10 border-mint"
                    : "bg-forest border-mint/10 hover:border-mint/30"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="text-center">
                  <type.icon className={`h-8 w-8 mx-auto mb-2 ${
                    selectedType === type.id ? "text-mint" : "text-white/70"
                  }`} />
                  <h3 className={`font-medium ${
                    selectedType === type.id ? "text-mint" : "text-white"
                  }`}>
                    {type.label}
                  </h3>
                  <p className="text-sm text-white/60 mt-1">{type.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Title</label>
              <Input 
                placeholder="Enter content title..."
                className="bg-forest border-mint/20 text-white"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <Textarea 
                placeholder="Describe your content..."
                className="bg-forest border-mint/20 text-white min-h-[100px]"
              />
            </div>

            {selectedType === "text" && (
              <div>
                <label className="block text-white font-medium mb-2">Content</label>
                <Textarea 
                  placeholder="Paste or type your content here..."
                  className="bg-forest border-mint/20 text-white min-h-[200px]"
                />
              </div>
            )}

            {selectedType === "link" && (
              <div>
                <label className="block text-white font-medium mb-2">URL</label>
                <Input 
                  placeholder="https://www.taskmaso-n.web.app"
                  type="url"
                  className="bg-forest border-mint/20 text-white"
                />
              </div>
            )}

            {(selectedType === "video" || selectedType === "image") && (
              <div>
                <label className="block text-white font-medium mb-2">Upload File</label>
                <div className="border-2 border-dashed border-mint/20 rounded-lg p-8 text-center bg-forest">
                  <Upload className="h-12 w-12 text-mint/40 mx-auto mb-4" />
                  <p className="text-white/70 mb-2">
                    Drag and drop your {selectedType} file here, or click to browse
                  </p>
                  <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10">
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button 
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-mint hover:bg-mint/90 text-forest px-8 hover-scale"
              >
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Import Content
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </RefinedPageLayout>
  );
};

export default ImportContent;
