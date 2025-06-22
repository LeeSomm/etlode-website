<script lang="ts">
	import { onMount } from 'svelte';
	import tradingData from '$lib/data/trading_data.json';

	interface Transaction {
		asset: string;
		ticker?: string;
		owner: string;
		owner_code: string;
		transaction_type: string;
		transaction_date: string;
		notification_date: string;
		amount: string;
		filing_id: string;
		member_name: string;
		district: string;
		pdf_url: string;
		parsed_at: string;
		stock_transaction_count: number;
	}

	type SortColumn = keyof Transaction;
	type SortDirection = 'asc' | 'desc';

	// Reactive state
	let transactions = $state<Transaction[]>([]);
	let filteredTransactions = $state<Transaction[]>([]);
	let sortColumn = $state<SortColumn>('transaction_date');
	let sortDirection = $state<SortDirection>('desc');
	let searchTerm = $state<string>('');
	let selectedTransactionType = $state<string>('');
	let selectedMember = $state<string>('');
	let currentPage = $state<number>(1);
	let itemsPerPage = $state<number>(25);

	// Computed values
	let uniqueMembers = $derived<string[]>([...new Set(transactions.map(t => t.member_name))].sort());
	let transactionTypes = $derived<string[]>([...new Set(transactions.map(t => t.transaction_type))].sort());
	let totalPages = $derived<number>(Math.ceil(filteredTransactions.length / itemsPerPage));
	let paginatedTransactions = $derived<Transaction[]>(
		filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	// Flatten and combine data
	onMount(() => {
		const flattenedTransactions: Transaction[] = [];
		
		for (const [filingId, filing] of Object.entries(tradingData.processed_filings)) {
			if (filing.transactions) {
				filing.transactions.forEach(transaction => {
					const memberInfo = filing.member_info as { name: string; district: string };
                    
                    // Remove "Hon. " prefix from member name
					const cleanName = memberInfo.name.replace(/^Hon\.\s+/, '');
					
					flattenedTransactions.push({
						...transaction,
						filing_id: filingId,
						member_name: cleanName,
						district: memberInfo.district,
						pdf_url: filing.pdf_url,
						parsed_at: filing.parsed_at,
						stock_transaction_count: filing.stock_transaction_count
					});
				});
			}
		}

		transactions = flattenedTransactions;
		applyFilters();
	});

	// Filter and sort logic
	function applyFilters(): void {
		let filtered = transactions;

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(t => 
				t.member_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				t.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(t.ticker && t.ticker.toLowerCase().includes(searchTerm.toLowerCase()))
			);
		}

		// Transaction type filter
		if (selectedTransactionType) {
			filtered = filtered.filter(t => t.transaction_type === selectedTransactionType);
		}

		// Member filter
		if (selectedMember) {
			filtered = filtered.filter(t => t.member_name === selectedMember);
		}

		// Sort
		filtered.sort((a, b) => {
			let aVal: any = a[sortColumn];
			let bVal: any = b[sortColumn];

			// Handle dates
			if (sortColumn === 'transaction_date' || sortColumn === 'notification_date') {
				aVal = new Date(aVal);
				bVal = new Date(bVal);
			}

			if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		filteredTransactions = filtered;
		currentPage = 1; // Reset to first page when filters change
	}

	function handleSort(column: SortColumn): void {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'desc';
		}
		applyFilters();
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString();
	}

	function getSortIcon(column: SortColumn): string {
		if (sortColumn !== column) return '↕️';
		return sortDirection === 'asc' ? '↑' : '↓';
	}

	// Watch for filter changes
	$effect(() => {
		applyFilters();
	});
</script>

<svelte:head>
	<title>Congressional Trading Data | ET-Lode</title>
	<meta name="description" content="Track and analyze congressional trading data with real-time updates and comprehensive filtering." />
</svelte:head>

<section class="bg-gradient-to-r from-black to-gray-900 text-white py-16">
	<div class="container mx-auto px-4">
		<div class="text-center">
			<h1 class="text-4xl md:text-5xl font-bold mb-6">
				Congressional <span class="text-teal-400">Trading</span> Data
			</h1>
			<p class="text-xl mb-4">
				Track and analyze stock transactions by members of Congress
			</p>
			<div class="text-sm text-gray-300">
				Last updated: {new Date(tradingData.last_updated).toLocaleString()}
			</div>
			<div class="mt-4 text-xs text-gray-400 max-w-2xl mx-auto">
				<strong>Disclosure:</strong> This is a personal project for educational and informational purposes only. 
				The data presented may contain errors or omissions and is not warranted to be accurate or complete. 
				This information should not be used for investment decisions or legal purposes.
			</div>
		</div>
	</div>
</section>

<section class="py-8 bg-white">
	<div class="container mx-auto px-4">
		<div class="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
			<div class="flex flex-wrap gap-4 items-center justify-between mb-6">
				<div class="flex gap-6 text-sm">
					<span class="font-medium">Total Transactions: <span class="text-teal-600">{transactions.length}</span></span>
					<span class="font-medium">Filtered: <span class="text-teal-600">{filteredTransactions.length}</span></span>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div class="flex flex-col">
					<label for="search" class="text-sm font-medium text-gray-700 mb-2">Search</label>
					<input 
						id="search"
						type="text" 
						bind:value={searchTerm} 
						placeholder="Member, district, asset, or ticker..."
						class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
					/>
				</div>

				<div class="flex flex-col">
					<label for="member" class="text-sm font-medium text-gray-700 mb-2">Member</label>
					<select id="member" bind:value={selectedMember} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
						<option value="">All Members</option>
						{#each uniqueMembers as member}
							<option value={member}>{member}</option>
						{/each}
					</select>
				</div>

				<div class="flex flex-col">
					<label for="transaction-type" class="text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
					<select id="transaction-type" bind:value={selectedTransactionType} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
						<option value="">All Types</option>
						{#each transactionTypes as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</div>

				<div class="flex flex-col">
					<label for="items-per-page" class="text-sm font-medium text-gray-700 mb-2">Items per page</label>
					<select id="items-per-page" bind:value={itemsPerPage} class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
						<option value={25}>25</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
						<option value={200}>200</option>
					</select>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-md overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50">
						<tr>
							<th onclick={() => handleSort('member_name')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
								Member {getSortIcon('member_name')}
							</th>
							<th onclick={() => handleSort('ticker')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden sm:table-cell">
								Ticker {getSortIcon('ticker')}
							</th>
							<th onclick={() => handleSort('asset')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
								Asset {getSortIcon('asset')}
							</th>
							<th onclick={() => handleSort('transaction_type')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
								Type {getSortIcon('transaction_type')}
							</th>
							<th onclick={() => handleSort('transaction_date')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
								Transaction Date {getSortIcon('transaction_date')}
							</th>
							<th onclick={() => handleSort('notification_date')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden md:table-cell">
								Filing Date {getSortIcon('notification_date')}
							</th>
							<th onclick={() => handleSort('amount')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell">
								Amount {getSortIcon('amount')}
							</th>
							<th onclick={() => handleSort('owner')} class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell">
								Owner {getSortIcon('owner')}
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each paginatedTransactions as transaction}
							<tr class="hover:bg-gray-50">
								<td class="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">
									<div class="truncate">
										{transaction.member_name}
									</div>
									<div class="text-xs text-gray-500 truncate">
										({transaction.district})
									</div>
									<div class="text-xs mt-1">
										Filing: 
                                        <a 
											href={transaction.pdf_url} 
											target="_blank" 
											rel="noopener noreferrer"
											class="text-teal-600 hover:text-teal-800 underline"
										>
											{transaction.filing_id}
										</a>
									</div>
								</td>
								<td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
									{#if transaction.ticker}
										<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{transaction.ticker}
										</span>
									{:else}
										<span class="text-gray-400">-</span>
									{/if}
								</td>
								<td class="px-3 sm:px-6 py-4 text-sm text-gray-900">
									<!-- Mobile: Show ticker and amount -->
									<div class="sm:hidden">
										{#if transaction.ticker}
											<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
												{transaction.ticker}
											</span>
										{:else}
											<span class="text-gray-400 text-xs">No ticker</span>
										{/if}
									</div>
									<!-- Desktop: Show asset name -->
									<div class="hidden sm:block truncate max-w-[120px] sm:max-w-xs" title={transaction.asset}>
										{transaction.asset}
									</div>
									<!-- Show amount on mobile when hidden in header -->
									<div class="lg:hidden text-xs text-gray-500 mt-1">
										{transaction.amount}
									</div>
								</td>
								<td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
									<span class="inline-flex items-center  px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium 
										{transaction.transaction_type.toLowerCase() === 'purchase' ? 'bg-green-100 text-green-800' : 
										 transaction.transaction_type.toLowerCase() === 'sale' ? 'bg-red-100 text-red-800' : 
										 'bg-yellow-100 text-yellow-800'}">
										{transaction.transaction_type}
									</span>
									<!-- Show owner on mobile when hidden in header -->
									<div class="lg:hidden text-xs text-gray-500 mt-1 truncate">
										{transaction.owner}
									</div>
								</td>
								<td class="px-3 sm:px-6 py-4 text-sm text-gray-500">
									<div class="whitespace-nowrap">
										{formatDate(transaction.transaction_date)}
									</div>
									<!-- Show filing date on mobile when hidden in header -->
									<div class="md:hidden text-xs text-gray-400 mt-1">
										Filed: {formatDate(transaction.notification_date)}
									</div>
								</td>
								<td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
									{formatDate(transaction.notification_date)}
								</td>
								<td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
									{transaction.amount}
								</td>
								<td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
									{transaction.owner}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		{#if totalPages > 1}
			<div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
				<div class="flex flex-1 justify-between sm:hidden">
					<button 
						onclick={() => currentPage = Math.max(1, currentPage - 1)}
						disabled={currentPage === 1}
						class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Previous
					</button>
					<button 
						onclick={() => currentPage = Math.min(totalPages, currentPage + 1)}
						disabled={currentPage === totalPages}
						class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Next
					</button>
				</div>
				<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
					<div>
						<p class="text-sm text-gray-700">
							Showing page <span class="font-medium">{currentPage}</span> of <span class="font-medium">{totalPages}</span>
						</p>
					</div>
					<div>
						<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
							<button 
								onclick={() => currentPage = Math.max(1, currentPage - 1)}
								disabled={currentPage === 1}
								class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<span class="sr-only">Previous</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
								</svg>
							</button>
							<span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300">
								{currentPage}
							</span>
							<button 
								onclick={() => currentPage = Math.min(totalPages, currentPage + 1)}
								disabled={currentPage === totalPages}
								class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<span class="sr-only">Next</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
								</svg>
							</button>
						</nav>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	/* Custom styles for enhanced table interactions */
	th {
		user-select: none;
	}
	
	td {
		max-width: 200px;
	}
	
	/* Ensure proper mobile scrolling for table */
	@media (max-width: 768px) {
		td {
			font-size: 12px;
			padding: 8px 4px;
		}
	}
</style>