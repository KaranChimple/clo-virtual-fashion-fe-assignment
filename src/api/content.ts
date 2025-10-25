import { apiClient } from './client';
import { ContentResponse, FetchContentParams } from '../types';

export const contentApi = {
  fetchContent: async (params: FetchContentParams): Promise<ContentResponse> => {
    const queryParams: Record<string, any> = {
      page: params.page,
      pageSize: params.pageSize,
    };

    if (params.pricing && params.pricing.length > 0) {
      queryParams.pricing = params.pricing.join(',');
    }

    if (params.keyword) {
      queryParams.keyword = params.keyword;
    }

    if (params.minPrice !== undefined) {
      queryParams.minPrice = params.minPrice;
    }

    if (params.maxPrice !== undefined) {
      queryParams.maxPrice = params.maxPrice;
    }

    if (params.sortBy) {
      queryParams.sortBy = params.sortBy;
    }

    try {
      const response = await apiClient.get<ContentResponse>('/store/content', queryParams);
      return response;
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  },

  fetchContentMock: async (params: FetchContentParams): Promise<ContentResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockItems = Array.from({ length: params.pageSize }, (_, i) => ({
      id: `item-${params.page}-${i}`,
      title: `Fashion Item ${params.page * params.pageSize + i + 1}`,
      userName: `Designer ${(i % 5) + 1}`,
      userAvatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      thumbnail: `https://picsum.photos/400/500?random=${params.page * params.pageSize + i}`,
      pricingOption: ['PAID', 'FREE', 'VIEW_ONLY'][i % 3] as any,
      price: i % 3 === 0 ? `${((i % 10) + 1) * 10}.00` : undefined,
      currency: 'USD',
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000),
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      tags: ['3D', 'Fashion', 'Design'].slice(0, (i % 3) + 1),
    }));

    return {
      items: mockItems,
      total: 100,
      page: params.page,
      pageSize: params.pageSize,
      hasMore: params.page < 5,
    };
  },
};
