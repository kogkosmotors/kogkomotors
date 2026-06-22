import { useMemo, useState } from "react";
import { formatPrice } from "@/data/vehicles";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function FinanceCalculator({ price }: { price: number }) {
  const [deposit, setDeposit] = useState(Math.round(price * 0.2));
  const [term, setTerm] = useState(48);
  const [apr, setApr] = useState(6.9);

  const monthly = useMemo(() => {
    const principal = Math.max(price - deposit, 0);
    const r = apr / 100 / 12;
    if (r === 0) return principal / term;
    return (principal * r) / (1 - Math.pow(1 + r, -term));
  }, [price, deposit, term, apr]);

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="font-display text-2xl">Finance Calculator</h3>
      <p className="mt-1 text-sm text-muted-foreground">An indicative estimate. Subject to status and approval.</p>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <Label>Deposit: <span className="text-primary">{formatPrice(deposit)}</span></Label>
          <Slider min={0} max={Math.round(price * 0.6)} step={500} value={[deposit]} onValueChange={(v) => setDeposit(v[0])} />
        </div>
        <div className="space-y-2">
          <Label>Term: <span className="text-primary">{term} months</span></Label>
          <Slider min={12} max={84} step={6} value={[term]} onValueChange={(v) => setTerm(v[0])} />
        </div>
        <div className="space-y-2">
          <Label>APR: <span className="text-primary">{apr.toFixed(1)}%</span></Label>
          <Slider min={2.9} max={14.9} step={0.1} value={[apr]} onValueChange={(v) => setApr(v[0])} />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-secondary/40 p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Estimated Monthly Payment</p>
        <p className="text-gold-gradient mt-1 font-display text-4xl font-semibold">
          {formatPrice(Math.round(monthly))}<span className="text-base text-muted-foreground">/mo</span>
        </p>
      </div>
    </div>
  );
}
