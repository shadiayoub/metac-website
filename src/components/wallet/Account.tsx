"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  referralContractAddress,
  useWriteReferralContractBuyWithReferral,
  useWriteReferralContractBuyWithBnb,
  useReadReferralContractPriceUsd,
  useReadReferralContractGetBnbPriceInUsdt,
  useReadReferralContractTokenAcces,
} from "@/config/generated";
import { USDTtoken, USDCtoken, BUSDtoken } from "@/data/Tokens";
import { ethers, formatUnits } from "ethers";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import WalletConnectButton from "@/components/partials/wallet/WalletConnectButton";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Loader2, LogOut, Slash } from "lucide-react";
import Title from "@/components/typography/Title";
import DownloadButton from "@/components/pages/home/DownloadButton";
import Image from "next/image";
import { Icons } from "@/components/assets/Icons";
import { Progress } from "@/components/ui/progress";
import CustomButton from "@/components/custom/CustomButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { createBSCProvider } from "@/utils/rpc-providers";
import PreSaleCountdown from "@/components/pages/home/PreSaleCountdown";
import { isPreSaleExpired } from "@/utils/presale-utils";

export default function Account() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { error } = useConnect();
  const { toast } = useToast();

  const [chainId, setChainId] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useState("BNB");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproving, setIsApproving] = useState(false); // New state to track approval status
  const [isBuying, setIsBuying] = useState(false); // New state to track buying status
  const [loadingMessage, setLoadingMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const [approximateTokens, setApproximateTokens] = useState<number>(0);
  const [bnbPriceInUsdt, setBnbPriceInUsdt] = useState<number | null>(null);

  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [tokensSold, setTokensSold] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(90);

  const [showReferral, setShowReferral] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPreSaleEnded, setIsPreSaleEnded] = useState(isPreSaleExpired());
  const referralLink = address ? `https://metacces.com/buy-acces/?ref=${address}` : "";

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (tokenAddress) {
        try {
          // Create a public provider for BSC mainnet with fallback support
          const publicProvider = await createBSCProvider(false);

          const erc20Contract = new ethers.Contract(
            tokenAddress,
            ["function balanceOf(address owner) view returns (uint256)"],
            publicProvider
          );

          const balance = await erc20Contract.balanceOf(
            referralContractAddress[56]
          );
          const formattedBalance = parseFloat(formatUnits(balance, 18));
          setTokenBalance(formattedBalance);
          console.log(
            "Token Balance:",
            formattedBalance.toFixed(4),
            "Acces in Contract"
          );

          const totalSupply = 10000000;
          const sold = totalSupply - formattedBalance;
          const icoTotalSupply = 50000000;
          const alreadySold = 40000000;
          const totalSold = alreadySold + sold;
          setTokensSold(totalSold);

          const percentage = (totalSold / icoTotalSupply) * 100;
          setProgressPercentage(percentage);
        } catch (error) {
          console.error("Error fetching token balance:", error);
        }
      }
    };

    fetchTokenBalance();
  }, [tokenAddress]);

  const { data: tokenAddressData } = useReadReferralContractTokenAcces();
  useEffect(() => {
    if (tokenAddressData) {
      setTokenAddress(tokenAddressData);
    }
  }, [tokenAddressData]);

  useEffect(() => {
    const fetchChainId = async () => {
      if (connector) {
        try {
          const provider = await connector.getProvider();
          const ethersProvider = new ethers.BrowserProvider(
            provider as ethers.Eip1193Provider
          );
          const network = await ethersProvider.getNetwork();
          const currentChainId = Number(network.chainId);

          setChainId(currentChainId);

          if (isConnected && currentChainId !== 56) {
            toast({
              title: "Wrong Network",
              description: "Please connect to the BSC mainnet.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error fetching chain ID:", error);
        }
      }
    };

    if (isConnected) {
      fetchChainId();
    }
  }, [isConnected, toast, connector]);

  const { writeContractAsync: buyWithReferral } =
    useWriteReferralContractBuyWithReferral();
  const { writeContractAsync: buyWithBnb } =
    useWriteReferralContractBuyWithBnb();

  const { data: priceUSD } = useReadReferralContractPriceUsd();
  const { data: BNBPriceInUsdtData } = useReadReferralContractGetBnbPriceInUsdt(
    {
      args: [1n],
    }
  );

  useEffect(() => {
    const fetchBnbPrice = () => {
      if (BNBPriceInUsdtData) {
        setBnbPriceInUsdt(parseFloat(formatUnits(BNBPriceInUsdtData, 0)));
      }
    };

    fetchBnbPrice();
    const interval = setInterval(fetchBnbPrice, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [BNBPriceInUsdtData]);

  const calculateTokens = () => {
    if (!priceUSD || !bnbPriceInUsdt || !amount) return 0;

    const tokenPriceInUsdt = parseFloat(formatUnits(priceUSD, 18));
    const inputAmount = parseFloat(amount);
    let amountInUsdt = 0;

    switch (selectedToken) {
      case "BNB":
        amountInUsdt = inputAmount * bnbPriceInUsdt;
        break;
      case "USDT":
      case "USDC":
      case "BUSD":
        amountInUsdt = inputAmount;
        break;
      default:
        return 0;
    }

    return amountInUsdt / tokenPriceInUsdt;
  };

  useEffect(() => {
    const tokens = calculateTokens();
    setApproximateTokens(tokens);
  }, [amount, selectedToken, priceUSD, bnbPriceInUsdt]);

  const handleApproveAndBuy = async () => {
    if (isPreSaleEnded) {
      toast({
        title: "Pre-Sale Ended",
        description: "The pre-sale has concluded and purchases are no longer available.",
        variant: "destructive",
      });
      return;
    }
    
    if (chainId !== 56) {
      toast({
        title: "Wrong Network",
        description: "Please switch to BSC mainnet.",
        variant: "destructive",
      });
      console.log("Chain ID:", chainId);
      return;
    }
    try {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid amount.",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      setLoadingMessage("Processing approval...");

      const urlParams = new URLSearchParams(window.location.search);
      const referralAddress =
        urlParams.get("ref") ||
        "0x951d1c91ebefa1eeb0752c50d23d26e918b8b575";

        if (selectedToken === "BNB") {
          setIsBuying(true);
          
          if (!connector) {
            throw new Error("Connector is not available");
          }
        
          const provider = await connector.getProvider();
          const ethersProvider = new ethers.BrowserProvider(provider as ethers.Eip1193Provider);
          
          const feeData = await ethersProvider.getFeeData();
          
          const tx = await buyWithBnb({
            args: [referralAddress as `0x${string}`],
            value: ethers.parseEther(parsedAmount.toString()),
            gas: 500000n, // Increased gas limit
            maxFeePerGas: feeData.maxFeePerGas ? 
              BigInt(Math.ceil(Number(feeData.maxFeePerGas) * 1.2)) : // 20% buffer
              undefined,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ?
              BigInt(Math.ceil(Number(feeData.maxPriorityFeePerGas) * 1.2)) : // 20% buffer
              undefined
          });
        
          setTransactionHash(tx);
        }
         else {
        setIsApproving(true); // Start the approval process
        if (!connector) {
          throw new Error("Connector is not available");
        }
        const provider = await connector.getProvider();

        const signer = await new ethers.BrowserProvider(
          provider as ethers.Eip1193Provider
        ).getSigner();

        const paymentTokenAddress =
          selectedToken === "USDT"
            ? USDTtoken
            : selectedToken === "USDC"
              ? USDCtoken
              : BUSDtoken;
        const erc20Contract = new ethers.Contract(
          paymentTokenAddress,
          [
            "function allowance(address owner, address spender) external view returns (uint256)",
            "function approve(address spender, uint256 amount) external returns (bool)",
          ],
          signer
        );

        const amountInWei = ethers.parseEther(parsedAmount.toString());
        const allowance = await erc20Contract.allowance(
          address,
          referralContractAddress[56]
        );

        if (BigInt(allowance.toString()) < BigInt(amountInWei.toString())) {
          const tx = await erc20Contract.approve(
            referralContractAddress[56],
            amountInWei
          );
          await tx.wait();
          setLoadingMessage("Approval successful. Processing purchase...");
          setIsApproving(false); // Approval process completed
          setIsBuying(true); // Now we proceed to buying
        } else {
          setLoadingMessage("Approval not needed. Proceeding to purchase...");
        }

        const purchaseTx = await buyWithReferral({
          args: [
            referralAddress as `0x${string}`,
            paymentTokenAddress,
            amountInWei,
          ],
        });
        setTransactionHash(purchaseTx);
      }

      toast({
        title: "Purchase Successful",
        description: "Your transaction has been processed successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      toast({
        title: "Transaction Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setIsApproving(false);
      setIsBuying(false);
      setLoadingMessage("");
    }
  };

  const handleShowReferral = () => {
    setShowReferral(true);
    setCopied(false);
  };

  const handleCopyReferral = async () => {
    if (referralLink) {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePreSaleExpiryChange = (expired: boolean) => {
    setIsPreSaleEnded(expired);
    if (expired) {
      toast({
        title: "Pre-Sale Ended",
        description: "The pre-sale has concluded. Thank you for your interest!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div>
        {/* Pre-Sale Countdown */}
        <section className="mb-8">
          <PreSaleCountdown 
            compact={true} 
            showBuyButton={false} 
            onExpiryChange={handlePreSaleExpiryChange}
          />
        </section>
        
        <section>
          {isPreSaleEnded && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
              <div className="flex items-center">
                <div className="text-red-600 dark:text-red-400 font-semibold">
                  ⚠️ Pre-Sale Has Ended
                </div>
              </div>
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                The pre-sale concluded on September 20, 2025. Token purchases are no longer available.
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div
                className={`bg-muted ring-1 ring-foreground-muted w-full h-7 rounded-lg relative overflow-clip`}
              >
                <div
                  className={`absolute left-0 top-0 bg-gradient-to-r from-[#5F9FE7] to-[#154C89] h-full`}
                  style={{ width: `${progressPercentage}%` }}
                />
                <div
                  className={`absolute left-0 top-0 h-full flex items-center`}
                >
                  {Array.from({ length: 20 }).map((_, i: number) => (
                    <Slash
                      key={i}
                      className={`h-10 aspect-square text-muted`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p>{tokensSold.toLocaleString()}/50,000,000 Acces</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`grid grid-cols-2 gap-2`}>
                <div className={`space-y-2`}>
                  <Label className={`text-foreground`} htmlFor="currentPrice">
                    Current Price:{" "}
                  </Label>
                  <div
                    className={
                      "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center"
                    }
                  >
                    <p>0.20$</p>
                  </div>
                </div>
                <div className={`space-y-2`}>
                  <Label className={`text-foreground`} htmlFor="nextPrice">
                    Next Price:{" "}
                  </Label>
                  <div
                    className={
                      "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center"
                    }
                  >
                    <p>0.25$</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`text-foreground`} htmlFor="payment-method">
                  Select Payment Method
                </Label>
                <div className={`grid grid-cols-2 gap-2`}>
                  <Select
                    value={selectedToken}
                    onValueChange={(value) => setSelectedToken(value)}
                    disabled={isPreSaleEnded}
                  >
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BNB">
                        <span className={`flex flex-row items-center gap-4`}>
                          <span>
                            <Image
                              src={"/wallet/bnb.png"}
                              alt={"BNB"}
                              width={160}
                              height={160}
                              className={`size-5 aspect-square object-contain`}
                            />
                          </span>
                          <span>BNB</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="USDT">
                        <span className={`flex flex-row items-center gap-4`}>
                          <span>
                            <Image
                              src={"/wallet/usdt.png"}
                              alt={"USDT"}
                              width={160}
                              height={160}
                              className={`size-5 aspect-square object-contain`}
                            />
                          </span>
                          <span>USDT</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="USDC">
                        <span className={`flex flex-row items-center gap-4`}>
                          <span>
                            <Image
                              src={"/wallet/usdc.png"}
                              alt={"USDC"}
                              width={160}
                              height={160}
                              className={`size-5 aspect-square object-contain`}
                            />
                          </span>
                          <span>USDC</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="BUSD">
                        <span className={`flex flex-row items-center gap-4`}>
                          <span>
                            <Image
                              src={"/wallet/busd.png"}
                              alt={"BUSD"}
                              width={160}
                              height={160}
                              className={`size-5 aspect-square object-contain`}
                            />
                          </span>
                          <span>BUSD</span>
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className={`h-full w-full`}>
                    <Button variant={"outline"} className={`w-full`} asChild>
                      <Link
                        href={
                          "https://widget.finchpay.io/?a=30&p=EUR&c=BNB&n=BSC&partner_id=d09c3e4d6231ad46c7a60c90e315da1d75116aff"
                        }
                        className={`w-full h-full flex items-center justify-end gap-2`}
                      >
                        <span>
                          <CreditCard className={`size-5`} />
                        </span>
                        <span>Card</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`text-foreground`} htmlFor="amount">
                  You Will Pay
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Amount in ${selectedToken}`}
                  min={0}
                  disabled={isPreSaleEnded}
                />
              </div>
              <div className="space-y-2">
                <Label className={`text-foreground`} htmlFor="tokens">
                  You Will Get
                </Label>
                <div className={`relative`}>
                  <Input
                    id="tokens"
                    type="number"
                    value={approximateTokens.toFixed(2)}
                    readOnly
                    placeholder={`Amount of ACCES`}
                  />
                  <Icons.logo
                    className={`absolute right-2 top-2 fill-foreground size-6`}
                  />
                </div>
              </div>
              {isConnected ? (
                <div className={`space-y-2`}>
                  {isPreSaleEnded ? (
                    <Button
                      disabled={true}
                      className="w-full bg-gray-500 text-white rounded-xl cursor-not-allowed"
                    >
                      Pre-Sale Ended
                    </Button>
                  ) : (
                    <Button
                      onClick={handleApproveAndBuy}
                      disabled={isProcessing}
                      className="w-full bg-[#5F9FE7] hover:bg-[#447ab8] text-white rounded-xl"
                    >
                      {isApproving ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Approving...
                        </span>
                      ) : isBuying ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Buying...
                        </span>
                      ) : (
                        `Buy with ${selectedToken}`
                      )}
                    </Button>
                  )}
                  <div
                    className={`flex flex-col justify-center items-center gap-2`}
                  >
                    <span>
                      <Button variant={"link"} onClick={() => disconnect()}>
                        Disconnect
                      </Button>
                    </span>
                    <Button
                      onClick={handleShowReferral}
                      disabled={isPreSaleEnded}
                      className="w-full mt-2 bg-gradient-to-r from-[#5F9FE7] to-[#154C89] text-white rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                      {isPreSaleEnded ? "Pre-Sale Ended" : "Get Referral Link"}
                    </Button>
                    <p className={`text-xs`}>
                      <span className={`font-semibold`}>Connected as: </span>
                      {address}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <WalletConnectButton />
                </div>
              )}

              {transactionHash && (
                <div className="mt-4 text-center">
                  <p className="mb-2">Transaction successful!</p>
                  <Button variant="link" asChild>
                    <Link
                      href={`https://bscscan.com/tx/${transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on BscScan
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Dialog open={showReferral} onOpenChange={setShowReferral}>
        <DialogContent className="bg-[#07112B] md:rounded-[24px] border-white/20">
          <DialogHeader>
            <DialogTitle>Your Referral Link</DialogTitle>
            <DialogDescription>
              Share this link to invite friends and earn rewards!
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 mt-4">
            <Input value={referralLink} readOnly className="flex-1" />
            <Button onClick={handleCopyReferral} variant="outline" className="min-w-[80px]">
              {copied ? <Check className="text-green-500" /> : "Copy"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
