import { useCreateDoctor } from '@/hooks/use-doctors';
import { Gender } from '@prisma/client';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { formatPhoneNumber } from '@/lib/utils';


interface AddDoctorDialogProps {
  isOpen: boolean
  onClose: () => void
}


function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender, //Male by default, TypeCasding 
    isActive: true,
  });

  const createDoctorMutation = useCreateDoctor(); //call Hook

  const handlePhoneChange = (value: string) => { //To make phone num in format: (XXX) XXX-XXXX
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  }; 

  const handleSave = () => {
    createDoctorMutation.mutate({ ...newDoctor }, { onSuccess: handleClose }); 
  };

  const handleClose = () => { //When we close the modal
    onClose(); //close the modal
    setNewDoctor({ //reset the state
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
    });
  };

  return (
  <Dialog open={isOpen} onOpenChange={handleClose}>

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader> 
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>Add a new doctor to your practice.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4"> {/*Input Fields */}

          <div className="grid grid-cols-2 gap-4"> {/*Name and Speciality */}
            <div className="space-y-2">
              <Label htmlFor="new-name">Name *</Label>
              <Input
                id="new-name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} /* Keep everything as it is , but update name */
                placeholder="Dr. John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-speciality">Speciality *</Label>
              <Input
                id="new-speciality"
                value={newDoctor.speciality}
                onChange={(e) => setNewDoctor({ ...newDoctor, speciality: e.target.value })} /* Keep everything as it is , but update speciality */
                placeholder="General Dentistry"
              />
            </div>
          </div>

          <div className="space-y-2"> {/* Email */}
            <Label htmlFor="new-email">Email *</Label>
            <Input
              id="new-email"
              type="email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })} /* Keep everything as it is , but update email */
              placeholder="doctor@example.com"
            />
          </div>

          <div className="space-y-2"> {/* Phone */}
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              value={newDoctor.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="grid grid-cols-2 gap-4"> {/* Gender and Status */}

            <div className="space-y-2"> {/* Gender */}
              <Label htmlFor="new-gender">Gender</Label>
              <Select
                value={newDoctor.gender || ""}
                onValueChange={(value) => setNewDoctor({ ...newDoctor, gender: value as Gender })} /*Once user select a gender we update the gender field in state */
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2"> {/* Status */}
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </div>

        <DialogFooter>  {/* Dialog Footer */}
          <Button variant="outline" onClick={handleClose}> {/*Close button */}
            Cancel
          </Button>

          {/* Save button */}   
          <Button 
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={
              !newDoctor.name ||
              !newDoctor.email ||
              !newDoctor.speciality ||
              createDoctorMutation.isPending
            }
          >
            {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDoctorDialog