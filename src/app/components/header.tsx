interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <div className="flex items-center justify-between space-y-2 mb-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
