
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User, Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 2340,
      duration: "8 weeks",
      level: "Advanced",
      price: "$89",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      rating: 4.9,
      students: 1567,
      duration: "6 weeks",
      level: "Beginner",
      price: "$69",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      instructor: "Emily Davis",
      rating: 4.7,
      students: 3421,
      duration: "10 weeks",
      level: "Intermediate",
      price: "$79",
      image: "/api/placeholder/400/250"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    toast.success("Removed from wishlist");
  };

  const moveToCart = (id: number) => {
    toast.success("Added to cart!");
  };

  return (
    <RefinedPageLayout title="My Wishlist" backUrl="/marketplace">
      <div className="max-w-6xl mx-auto">
        {wishlistItems.length > 0 ? (
          <div className="grid gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="bg-forest-light border border-mint/10 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 md:h-auto bg-forest flex items-center justify-center">
                    <div className="text-white/40 text-center">
                      <div className="text-4xl mb-2">📚</div>
                      <div className="text-sm">Course Image</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/70 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {item.instructor}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{item.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{item.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-mint/20 text-mint">
                          {item.level}
                        </Badge>
                        <span className="text-2xl font-bold text-mint">{item.price}</span>
                      </div>
                      <Button 
                        onClick={() => moveToCart(item.id)}
                        className="bg-mint hover:bg-mint/90 text-forest hover-scale"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-white/60 mb-6">
              Explore our marketplace and add courses you're interested in to your wishlist.
            </p>
            <Button className="bg-mint hover:bg-mint/90 text-forest hover-scale">
              Browse Courses
            </Button>
          </div>
        )}
      </div>
    </RefinedPageLayout>
  );
};

export default Wishlist;
