"use client";

import { useState } from "react";
import { MongoKit } from "@/components/mongo-kit";
import { OracleKit } from "@/components/oracle-kit";
import { Button } from "@/components/ui/button";

type KitId = "oracle" | "mongo";

export function KitApp() {
  const [kit, setKit] = useState<KitId>("oracle");

  return (
    <div>
      <div className="sticky top-0 z-20 border-b border-[color:var(--line)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3 sm:px-6">
          <span className="mr-2 text-xs font-medium text-[color:var(--muted)]">
            Kit चुनें:
          </span>
          <Button
            type="button"
            size="sm"
            variant={kit === "oracle" ? "default" : "outline"}
            onClick={() => setKit("oracle")}
          >
            Oracle SQL
          </Button>
          <Button
            type="button"
            size="sm"
            variant={kit === "mongo" ? "default" : "outline"}
            onClick={() => setKit("mongo")}
          >
            MongoDB Compass JS
          </Button>
        </div>
      </div>
      {kit === "oracle" ? <OracleKit /> : <MongoKit />}
    </div>
  );
}
