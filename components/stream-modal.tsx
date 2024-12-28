"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ComponentRef } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Hint from "@/components/hint";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { tags } from "@/constants";
import { cn } from "@/lib/utils";

interface StreamData {
  name: string;
  goal: string;
  variant: Scope;
  type: Type;
  tags: string[];
}

enum Scope {
  PUBLIC = "public",
  PRIVATE = "private",
}
enum Type {
  MALE = "male",
  FEMALE = "female",
  COUPLE = "couple",
  TRANS = "trans",
}

const StreamModal = ({ stream, title }: { stream: Stream | null | undefined, title?:string }) => {
  const closeRef = useRef<ComponentRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { user } = useUser();

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [data, setData] = useState<StreamData>({
    name: "",
    goal: "",
    variant: Scope.PUBLIC,
    type: Type.FEMALE,
    tags: [],
  });
  const handleClick = () => {
    if (!stream) {
      router.push("/model-profile");
    }
  };
  const handleTagsInput = (tag: string) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((prevTag) => prevTag !== tag)
        : [...prev.tags, tag],
    }));
  };

  const onRemove = () => {
    setThumbnailUrl(null);
  };
  const isPublic = data.variant === "public";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      createStream({
        name: data.name,
        goalText: data.goal,
        thumbnailUrl: thumbnailUrl,
        type: data.type,
        isPublic: isPublic,
        tags: data.tags,
      })
        .then(() => {
          toast.success("Stream created");
          closeRef?.current?.click();
          router.push(`/${user?.username}/`);
        })
        .catch(() => {
          toast.error(
            "An error occurred creating the stream. Please try again"
          );
          closeRef?.current?.click();
        });
    });
  };

  const handleRadioChange = (field: keyof StreamData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="bg-transparent lg:ml-auto max-lg:link-text"
          disabled={!user}
          onClick={handleClick}
        >
          {title || "Broadcast yourself"}
        </button>
      </DialogTrigger>
      <DialogContent className="my-2 max-h-[80vh] overflow-y-scroll hidden-scrollbar">
        <DialogHeader>
          <DialogTitle>Create stream </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-10">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              name="name"
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={data.name}
              className="ring-offset-n-5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      variant="default"
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "black",
                    },
                    button: {
                      color: "black",
                      fontWeight: 500,
                      backgroundColor: "transparent",
                    },
                    allowedContent: {
                      color: "black",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label>Goal</Label>
            <Input
              name="goal"
              disabled={isPending}
              placeholder="Stream's goal/target"
              onChange={onChange}
              value={data.goal}
              className="ring-offset-n-5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  font-medium"
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-4 text-n-1">Stream Type</Label>
            <RadioGroup.Root
              defaultValue="Prefer not to say"
              aria-label="type"
              onValueChange={(value) => handleRadioChange("type", value)}
            >
              <div className="flex items-center gap-4">
                {Object.values(Type).map((typeOption) => (
                  <div key={typeOption} className="flex items-center space-x-2">
                    <RadioGroup.Item
                      aria-label="type"
                      className="radioGroup-item peer"
                      value={typeOption}
                      id={typeOption}
                    >
                      <RadioGroup.Indicator className="radioGroup-indicator" />
                    </RadioGroup.Item>
                    <label
                      className="text-sm font-medium text-n-3 peer-checked:text-n-1"
                      htmlFor={typeOption}
                    >
                      {typeOption}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup.Root>
          </div>
          <div className="flex flex-col">
            <Label className="mb-4 text-n-1">Stream Scope</Label>
            <RadioGroup.Root
              defaultValue="Prefer not to say"
              aria-label="scope"
              onValueChange={(value) => handleRadioChange("variant", value)}
            >
              <div className="flex items-center gap-4">
                {Object.values(Scope).map((scopeOption) => (
                  <div
                    key={scopeOption}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroup.Item
                      aria-label="scope"
                      className="radioGroup-item peer"
                      value={scopeOption}
                      id={scopeOption}
                    >
                      <RadioGroup.Indicator className="radioGroup-indicator" />
                    </RadioGroup.Item>
                    <label
                      className="text-sm font-medium text-n-3 peer-checked:text-n-1"
                      htmlFor={scopeOption}
                    >
                      {scopeOption}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup.Root>
          </div>
          <div className="flex flex-col">
            <Label className="mb-4 text-n-1">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(1, 20).map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTagsInput(tag);
                  }}
                  className={cn(
                    "px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30hover:border-n-4 transition-colors",
                    data.tags.includes(tag) && "bg-primary-3 text-n-5"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant="default" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StreamModal;
