import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Checkbox } from "../ui/checkbox";

import { PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface MultiSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
}

const options = ["Feliz", "Triste", "Irritado", "Ansioso", "Calmo", "Confuso"];

export default function MultiSelect({ value, onChange }: MultiSelectProps) {

    function handleCheckChange(option: string) {
        if (value.includes(option)) {
            onChange(value.filter((item) => item !== option));
        } else {
            onChange([...value, option]);
        }
    }

    return (
        <Popover>
            <PopoverTrigger  asChild>
                <Button variant="outline" className="mt-4 w-20">Tags</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Card className="px-3 py-2 mt-1 relative translate-x-6">
                {options.map((option) => (
                    <div key={option} className="space-x-3">
                        <Checkbox 
                            checked={value.includes(option)}
                            onCheckedChange={() => handleCheckChange(option)}
                            id={option}
                        />
                        <label>
                            {option}
                        </label>
                    </div>
                ))}
                </Card>
            </PopoverContent>
        </Popover>
    )
}