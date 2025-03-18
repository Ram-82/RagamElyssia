import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { PaymentWrapper } from "./payment-wrapper";
import { Button } from "./button";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
}

export function PaymentModal({
  open,
  onOpenChange,
  amount,
  onSuccess,
}: PaymentModalProps) {
  // Handle cancellation with pending payment option
  const handleCancelWithPending = () => {
    onSuccess("pending_payment");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[475px] bg-black border border-gold/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-pearl">
            Complete Payment
          </DialogTitle>
          <DialogDescription className="text-[#C0C0C0]">
            Amount: ${amount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <PaymentWrapper amount={amount} onSuccess={onSuccess} />
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={handleCancelWithPending}
            className="border-gold/40 text-[#C0C0C0] hover:text-pearl hover:bg-transparent hover:border-gold"
          >
            Continue without payment
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gold/40 text-[#C0C0C0] hover:text-pearl hover:bg-transparent hover:border-gold"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}