"use client";

import { useState } from "react";
import { Settings2, GripVertical, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useHomeCustomization } from "@/hooks/useHomeCustomization";
import { cn } from "@/lib/utils";

function SortableItem({
  section,
  onToggle,
}: {
  section: ReturnType<typeof useHomeCustomization>["sections"][0];
  onToggle: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border bg-card transition-all",
        isDragging && "opacity-50 shadow-lg z-50"
      )}
    >
      <button
        className="touch-none cursor-grab text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{section.label}</p>
        <p className="text-xs text-muted-foreground truncate">{section.description}</p>
      </div>

      <Switch
        checked={section.enabled}
        onCheckedChange={() => onToggle(section.id)}
      />
    </div>
  );
}

export function CustomizeHomeDialog() {
  const { sections, toggleSection, reorderSections, resetToDefault, isLoaded } = useHomeCustomization();
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Settings2 className="w-4 h-4" />
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Customize Homepage</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetToDefault}
              className="text-xs gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          <p className="text-xs text-muted-foreground">
            Toggle sections on/off and drag to reorder your homepage layout.
          </p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {sections.map((section) => (
                  <SortableItem
                    key={section.id}
                    section={section}
                    onToggle={toggleSection}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </DialogContent>
    </Dialog>
  );
}
