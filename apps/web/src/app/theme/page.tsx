// package
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'ui';

/**
 * Page
 */

export default function Page() {
  return (
    <div className="flex flex-row gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-sm font-bold text-black/50">
          <div className="p-3 bg-background">Background</div>
          <div className="p-3 bg-foreground">Foreground</div>
          <div className="p-3 bg-selection">Selection</div>
          <div className="p-3 bg-comment">Comment</div>
          <div className="p-3 bg-cyan">Cyan</div>
          <div className="p-3 bg-green">Green</div>
          <div className="p-3 bg-orange">Orange</div>
          <div className="p-3 bg-pink">Pink</div>
          <div className="p-3 bg-purple">Purple</div>
          <div className="p-3 bg-red">Red</div>
          <div className="p-3 bg-yellow">Yellow</div>
          <div className="p-3 bg-muted">Muted</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="cyan">Cyan</Button>
          <Button variant="green">Green</Button>
          <Button variant="orange">Orange</Button>
          <Button variant="pink">Pink</Button>
          <Button variant="purple">Purple</Button>
          <Button variant="red">Red</Button>
          <Button variant="yellow">Yellow</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Form Input</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
