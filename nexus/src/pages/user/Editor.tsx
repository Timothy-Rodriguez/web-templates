import {
  usePlateEditor,
  Plate,
  PlateContent,
} from '@udecode/plate/react';

export default function Editor() {
  const editor = usePlateEditor();

  return (
    <Plate editor={editor}>
      <PlateContent placeholder="Type..." />
    </Plate>
  );
}
