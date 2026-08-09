export interface AllocationItem  {
    label: string,
    percent: number,
    color: string,
}

export interface AllocationBarProps {
    allocation: AllocationItem[]
}