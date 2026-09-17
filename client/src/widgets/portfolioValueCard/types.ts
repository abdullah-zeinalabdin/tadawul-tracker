export interface AllocationItem  {
    label: string,
    percent: number,
    color: string,
}

export interface AllocationBarProps {
    allocationData: AllocationItem[]
}

export interface AllocationLegendProps extends AllocationBarProps {
    portfolioValue: number,
}