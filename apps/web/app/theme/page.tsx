// package
import { Button, Card, CardHeader, CardTitle, CardContent } from 'ui';

/**
 * Page
 */

export default function Page() {
  return (
    <div className="flex flex-row gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-sm font-bold">
          <div className="bg-background p-3">Background</div>
          <div className="bg-foreground p-3 text-background">Foreground</div>
          <div className="bg-header p-3 border border-black/20">Header</div>
          <div className="bg-footer p-3">Footer</div>
          <div className="bg-border p-3">Border</div>
          <div className="bg-input p-3">Input</div>
          <div className="bg-ring p-3">Ring</div>
          <div className="bg-primary p-3">Primary</div>
          <div className="bg-secondary p-3">Secondary</div>
          <div className="bg-accent p-3">Accent</div>
          <div className="bg-destructive p-3">Destructive</div>
          <div className="bg-muted p-3">Muted</div>
          <div className="bg-card p-3 border border-black/20">Card</div>
          <div className="bg-popover p-3 border border-black/20">Popover</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Button>Primary</Button>
          </div>
          <div>
            <Button variant="secondary">Secondary</Button>
          </div>
          <div>
            <Button variant="outline">Outline</Button>
          </div>
          <div>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div>
            <Button variant="link">Link</Button>
          </div>
          <div>
            <Button variant="destructive">Destructive</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
