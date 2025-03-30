import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Contact {
  name: string;
  icon: string;
  visits: number;
}

interface ContactListProps {
  title: string;
  contacts: Contact[];
}

export function ContactList({ title, contacts }: ContactListProps) {
  return (
    <Card className="bg-zinc-900 text-white h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {contacts.map((contact, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="text-lg">{contact.icon}</span> {contact.name}
            </span>
            <span className="text-zinc-400">{contact.visits}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
