
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

const commonIcons = [
  '💒', '💐', '💌', '💍', '👗', '🎵', '🏛️', '📸', '📋', '🚗',
  '✈️', '🎂', '🍰', '🥂', '🎉', '🎊', '💄', '👔', '👠', '💎',
  '🌹', '🌺', '🌸', '🌻', '🕊️', '🎀', '🎁', '📱', '📞', '📧',
  '📝', '📅', '📍', '🏨', '🍽️', '🍷', '🎭', '🎪', '🎨', '🎯',
  '⭐', '💫', '✨', '🌟', '❤️', '💕', '💖', '💝', '🔔', '📢'
];

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onSelectIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customIcon, setCustomIcon] = useState('');

  const handleSelectIcon = (icon: string) => {
    onSelectIcon(icon);
    setIsOpen(false);
  };

  const handleCustomIconSubmit = () => {
    if (customIcon.trim()) {
      onSelectIcon(customIcon.trim());
      setCustomIcon('');
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Label>Icon</Label>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-2xl h-12"
      >
        {selectedIcon} Pilih Icon
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pilih Icon</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {commonIcons.map((icon, index) => (
                <Button
                  key={index}
                  type="button"
                  variant={selectedIcon === icon ? "default" : "outline"}
                  onClick={() => handleSelectIcon(icon)}
                  className="text-2xl h-12 p-2"
                >
                  {icon}
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label>Atau masukkan emoji custom:</Label>
              <div className="flex space-x-2">
                <Input
                  value={customIcon}
                  onChange={(e) => setCustomIcon(e.target.value)}
                  placeholder="Masukkan emoji..."
                  className="text-2xl"
                />
                <Button type="button" onClick={handleCustomIconSubmit}>
                  Gunakan
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
