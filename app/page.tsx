// import { Suspense } from "react";
// import { HomeContent } from "@/components/features/home/HomeContent";
// import {
//   mockOpportunities,
//   CURRENT_USER_DATA,
//   mockUsers,
//   mockArticles,
//   mockActivities,
//   CURRENT_USER,
// } from "@/lib/data";

// export default function Home() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <HomeContent
//         mockOpportunities={mockOpportunities}
//         currentUserData={CURRENT_USER_DATA}
//         mockUsers={mockUsers}
//         mockArticles={mockArticles}
//         mockActivities={mockActivities}
//         currentUser={CURRENT_USER}
//       />
//     </Suspense>
//   );
// }

"use client";

import MapView from "@/components/features/home/MapView";

export default function MapPage() {
  return (
    <main className="h-[calc(100vh-88px)]">
      <MapView defaultSelectedType="EXPERIENCE" />
    </main>
  );
}
