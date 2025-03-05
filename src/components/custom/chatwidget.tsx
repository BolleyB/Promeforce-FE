// // src/components/custom/ChatWidget.tsx
// "use client";
// import { useState } from "react";
// import { Chat } from "@/pages/chat/chat"; // Import your existing Chat component
// import { Button } from "@/components/ui/button";
// import { MessageCircle } from "lucide-react";

// export function ChatWidget() {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const toggleWidget = () => {
//     setIsOpen(prev => !prev);
//   };

//   return (
//     <>
//       {/* Floating Toggle Button */}
//       <Button
//         onClick={toggleWidget}
//         className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 z-50"
//       >
//         <MessageCircle size={24} />
//       </Button>

//       {/* Chat Widget Container */}
//       {isOpen && (
//         <div
//           className="fixed bottom-16 right-4 w-96 h-[80vh] bg-background border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col"
//         >
//           <Chat />
//         </div>
//       )}
//     </>
//   );
// }