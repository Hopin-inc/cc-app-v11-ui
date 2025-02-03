import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Check, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { mockUsers } from "@/lib/data";

type Props = {
  onSelect: (userId: string) => void;
  selectedUserId?: string;
  excludeUserId?: string;
};

export const UserSearchCombobox = ({
  onSelect,
  selectedUserId,
  excludeUserId,
}: Props) => {
  const [query, setQuery] = useState("");

  const filteredUsers = query === ""
    ? mockUsers
    : mockUsers.filter((user) =>
        user.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  const selectedUser = mockUsers.find((user) => user.id === selectedUserId);

  return (
    <Combobox value={selectedUserId} onChange={onSelect}>
      <div className="relative">
        <div className="relative w-full">
          <Combobox.Input
            className="w-full rounded-xl border-muted bg-muted/50 pl-10 pr-4 py-3 focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="ユーザー名を入力"
            displayValue={(userId: string) =>
              mockUsers.find((user) => user.id === userId)?.name ?? ""
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <User className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
            {filteredUsers.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-muted-foreground">
                ユーザーが見つかりません
              </div>
            ) : (
              filteredUsers
                .filter((user) => user.id !== excludeUserId)
                .map((user) => (
                  <Combobox.Option
                    key={user.id}
                    className={({ active }) =>
                      cn(
                        "relative cursor-pointer select-none py-2 px-4",
                        active ? "bg-primary/5 text-primary" : "text-foreground"
                      )
                    }
                    value={user.id}
                  >
                    {({ selected, active }) => (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 relative shrink-0 rounded-full overflow-hidden">
                          <Image
                            src={user.image ?? "/placeholder.svg"}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={cn(
                            "block truncate",
                            selected ? "font-medium" : "font-normal"
                          )}>
                            {user.name}
                          </span>
                          {user.title && (
                            <span className={cn(
                              "block truncate text-xs",
                              active ? "text-primary/60" : "text-muted-foreground"
                            )}>
                              {user.title}
                            </span>
                          )}
                        </div>
                        {selected && (
                          <span className={cn(
                            "flex items-center",
                            active ? "text-primary" : "text-primary"
                          )}>
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                    )}
                  </Combobox.Option>
                ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
