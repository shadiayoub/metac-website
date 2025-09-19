"use client";

import { useState, useEffect } from "react";
import { useConnect } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomButton from "@/components/custom/CustomButton";

function WalletConnectButton() {
  const { toast } = useToast();
  const { connectors, connect, error } = useConnect();
  const [selectedConnector, setSelectedConnector] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: error.message,
      });
    }
  }, [error, toast]);

  const handleConnectorSelect = (value: string) => {
    const connector = connectors.find((c) => c.name === value);
    if (connector) {
      setSelectedConnector(value);
      connect({ connector });
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomButton className={`w-full`}>
            <p>Connect Wallet</p>
          </CustomButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Connect Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {connectors.map((connector) => (
            <DropdownMenuItem key={connector.id}>
              <Button
                variant={"ghost"}
                className={`bg-none hover:bg-none w-full h-full`}
                onClick={() => handleConnectorSelect(connector.name)}
              >
                {connector.name}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 
      <Select onValueChange={handleConnectorSelect} value={selectedConnector}>
        <SelectTrigger className={`bg-transparent border-none`}>
        
          <SelectValue placeholder="Connect Wallet" />
        </SelectTrigger>
        <SelectContent>
          {connectors.map((connector) => (
            <SelectItem value={connector.name} key={connector.id}>
              {connector.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
    </div>
  );
}

export default WalletConnectButton;
